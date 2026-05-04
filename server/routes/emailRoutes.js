import express from 'express';
import { z } from 'zod';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { checkUsageLimit } from '../middleware/usageMiddleware.js';
import { deleteHistory, enhanceEmail, generateNewEmail, getHistory } from '../controllers/emailController.js';

const router = express.Router();

const generateSchema = z.object({
  body: z.object({
    topic: z.string().min(3).max(2000),
    tone: z.string().min(1),
    audience: z.string().min(1),
    additionalInstructions: z.string().optional()
  })
});

const improveSchema = z.object({
  body: z.object({
    originalEmail: z.string().min(10).max(5000),
    instructions: z.string().optional()
  })
});

router.post('/generate', protect, validate(generateSchema), checkUsageLimit, generateNewEmail);
router.post('/improve', protect, validate(improveSchema), checkUsageLimit, enhanceEmail);

// History Routes
router.get('/history', protect, getHistory);
router.delete('/history/:id', protect, deleteHistory);

export default router;
