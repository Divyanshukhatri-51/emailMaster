import jwt from 'jsonwebtoken';
import prisma from '../utils/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

<<<<<<< HEAD
      const jwtSecret = process.env.JWT_SECRET;
=======
      const jwtSecret = process.env.JWT_SECRET || "fallback_secret_key_123";
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
      const decoded = jwt.verify(token, jwtSecret);

      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
      
      if (!req.user) {
         return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export const adminProtect = async (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' });
  }
};
