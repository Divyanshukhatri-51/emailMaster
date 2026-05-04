import { generateEmail, improveEmail } from '../services/langchainService.js';
import prisma from '../utils/db.js';
<<<<<<< HEAD
import { Prisma } from '@prisma/client';
=======
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d

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
    
<<<<<<< HEAD
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
=======
    // Save to History
    await prisma.email.create({
      data: {
        userId: req.user.id,
        topic, tone, audience, content: emailDraft
      }
    });

    res.json({ success: true, draft: emailDraft });
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
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
<<<<<<< HEAD

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
=======
    res.json({ success: true, draft: improvedEmail });
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
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
<<<<<<< HEAD
=======
    if(!history){
        return res.status(404).json({
            success: false,
            message: "No history found."
        })
    }
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
}

<<<<<<< HEAD
export const deleteHistory = async (req, res) => {
  try {
    await prisma.email.delete({
=======
export const deleteHistory =  async (req, res) => {
  try {
    const history = await prisma.email.deleteMany({
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
<<<<<<< HEAD
    res.json({ success: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return res.status(404).json({ success: false, message: "No history found with given id." });
    }
=======
    if(!history){
        return res.status(404).json({
            success: false,
            message: "No history found with given id."
        })
    }
    res.json({ success: true });
  } catch (err) {
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
    res.status(500).json({ error: "Failed to delete history." });
  }
}
