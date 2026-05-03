import { generateEmail, improveEmail } from '../services/langchainService.js';
import prisma from '../utils/db.js';

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
    
    // Save to History
    await prisma.email.create({
      data: {
        userId: req.user.id,
        topic, tone, audience, content: emailDraft
      }
    });

    res.json({ success: true, draft: emailDraft });
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
    res.json({ success: true, draft: improvedEmail });
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
    if(!history){
        return res.status(404).json({
            success: false,
            message: "No history found."
        })
    }
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
}

export const deleteHistory =  async (req, res) => {
  try {
    const history = await prisma.email.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });
    if(!history){
        return res.status(404).json({
            success: false,
            message: "No history found with given id."
        })
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete history." });
  }
}
