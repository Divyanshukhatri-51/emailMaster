import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeUserNature } from "../services/userService.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sync-nature", protect, async (req, res) => {
  try {
    const summary = await analyzeUserNature(req.user.id);
    res.json({ success: true, profileSummary: summary });
  } catch (err) {
    res.status(500).json({ error: "Failed to analyze nature." });
  }
});

export default router;
