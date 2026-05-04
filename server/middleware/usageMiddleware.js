import prisma from '../utils/db.js';

export const checkUsageLimit = async (req, res, next) => {
  try {
    const user = req.user;
    const now = new Date();
    const lastReset = new Date(user.lastReset);
    
    // Check if 24 hours have passed since last reset
    const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);
    
    if (hoursSinceReset >= 24) {
      // Reset credits
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          aiCredits: 10,
          lastReset: now
        }
      });
      req.user = updatedUser; // Update user in request object
    }

    if (req.user.aiCredits <= 0) {
      return res.status(403).json({
        success: false,
        error: 'AI Usage Limit Reached',
        message: 'You have exhausted your 10 daily AI credits. Please try again tomorrow!'
      });
    }

    next();
  } catch (error) {
    console.error('Usage limiter error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
