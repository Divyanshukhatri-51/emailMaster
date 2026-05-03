import prisma from '../utils/db.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
  try {
    const email = 'admin@123.com';
    const password = '123456';
    
    const existingAdmin = await prisma.user.findUnique({ where: { email } });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
        profileSummary: 'Administrator'
      }
    });

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
