import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import { deleteEmail, deleteUsers, getEmails, getUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', protect, adminProtect, getUsers);

router.delete('/users/:id', protect, adminProtect, deleteUsers);

router.get('/emails', protect, adminProtect, getEmails);

router.delete('/emails/:id', protect, adminProtect, deleteEmail);

export default router;
