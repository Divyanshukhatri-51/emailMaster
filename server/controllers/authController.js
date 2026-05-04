import prisma from "../utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check existing
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "User already exists." });
    
    // Hash
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Save
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    
    // Token
<<<<<<< HEAD
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, jwtSecret, { expiresIn: "7d" });
    
    res.status(201).json({ 
      success: true, 
      token, 
      user: { id: newUser.id, email: newUser.email, role: newUser.role, aiCredits: newUser.aiCredits, lastReset: newUser.lastReset } 
    });
=======
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret_key_123";
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, jwtSecret, { expiresIn: "7d" });
    
    res.status(201).json({ success: true, token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });
    
<<<<<<< HEAD
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
    
    res.json({ 
      success: true, 
      token, 
      user: { id: user.id, email: user.email, profileSummary: user.profileSummary, role: user.role, aiCredits: user.aiCredits, lastReset: user.lastReset } 
    });
=======
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret_key_123";
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
    
    res.json({ success: true, token, user: { id: user.id, email: user.email, profileSummary: user.profileSummary, role: user.role } });
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed." });
  }
};
<<<<<<< HEAD

export const updateProfile = async (req, res) => {
  try {
    const { profileSummary } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { profileSummary }
    });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Failed to update profile." });
  }
};
=======
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
