import express from "express";
import { z } from "zod";
import { signup, login, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { analyzeUserNature } from "../services/userService.js";

const router = express.Router();

const signupSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
});

const profileSchema = z.object({
  body: z.object({
    profileSummary: z.string().min(5).max(5000)
  })
});

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.put("/profile", protect, validate(profileSchema), updateProfile);
router.post("/sync-nature", protect, async (req, res) => {
  try {
    const summary = await analyzeUserNature(req.user.id);
    res.json({ success: true, profileSummary: summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze nature." });
  }
});

export default router;
