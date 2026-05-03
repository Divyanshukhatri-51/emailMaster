import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { deleteHistory, enhanceEmail, generateNewEmail, getHistory } from '../controllers/emailController.js';

const router = express.Router();

router.post('/generate', protect, generateNewEmail);

router.post('/improve', protect, enhanceEmail);

// History Routes
router.get('/history', protect, getHistory);

router.delete('/history/:id', protect, deleteHistory);

export default router;
