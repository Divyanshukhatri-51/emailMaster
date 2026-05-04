import { generateEmail, improveEmail } from '../services/langchainService.js';
import prisma from '../utils/db.js';
import { Prisma } from '@prisma/client';

export const generateNewEmail = async (req, res) => {
  try {
    const { topic, tone, audience, additionalInstructions } = req.body;
    
    if (!topic || !tone || !audience) {
      return res.status(400).json({ error: 'Please provide topic, tone, and audience.' });
    }

    const emailDraft = await generateEmail({ 
      topic, tone, audience, additionalInstructions, 
      userId: req.user.id
    });
    
    // Save to History & Decrement Credits
    const [savedEmail, updatedUser] = await prisma.$transaction([
      prisma.email.create({
        data: {
          userId: req.user.id,
          topic, tone, audience, content: emailDraft
        }
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: { aiCredits: { decrement: 1 } }
      })
    ]);
    
    res.json({ 
      success: true, 
      draft: emailDraft, 
      aiCredits: updatedUser.aiCredits 
    });
  } catch (error) {
    console.error('Error in /generate route:', error);
    res.status(500).json({ error: 'Failed to generate email. Please try again later.' });
  }
}

export const enhanceEmail = async (req, res) => {
  try {
    const { originalEmail, instructions } = req.body;

    if (!originalEmail) {
      return res.status(400).json({ error: 'Please provide the original email text.' });
    }

    const improvedEmail = await improveEmail({ originalEmail, instructions });

    // Save to History & Decrement Credits
    const [savedEmail, updatedUser] = await prisma.$transaction([
      prisma.email.create({
        data: {
          userId: req.user.id,
          content: improvedEmail,
          topic: "Improved Draft",
          isImproved: true
        }
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: { aiCredits: { decrement: 1 } }
      })
    ]);

    res.json({ 
      success: true, 
      draft: improvedEmail, 
      aiCredits: updatedUser.aiCredits 
    });
  } catch (error) {
    console.error('Error in /improve route:', error);
    res.status(500).json({ error: 'Failed to improve email. Please try again later.' });
  }
}

export const getHistory =  async (req, res) => {
  try {
    const history = await prisma.email.findMany({ 
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
}

export const deleteHistory = async (req, res) => {
  try {
    await prisma.email.delete({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ success: false, message: "No history found with given id." });
    }
    res.status(500).json({ error: "Failed to delete history." });
  }
}
