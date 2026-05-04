import express from "express";
<<<<<<< HEAD
import { z } from "zod";
import { signup, login, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
=======
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
import { analyzeUserNature } from "../services/userService.js";

const router = express.Router();

<<<<<<< HEAD
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
=======
router.post("/signup", signup);
router.post("/login", login);
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
router.post("/sync-nature", protect, async (req, res) => {
  try {
    const summary = await analyzeUserNature(req.user.id);
    res.json({ success: true, profileSummary: summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze nature." });
  }
});

export default router;
