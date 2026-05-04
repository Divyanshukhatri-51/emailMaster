import prisma from '../utils/db.js';

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true }
    });
<<<<<<< HEAD
    if(!users || users.length === 0){
=======
    if(!users){
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
        return res.status(404).json({
            success: false,
            message: "No User found."
        })
    }
    res.json({ success: true, users, message: "Users fetched successfully." });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const getEmails = async (req, res) => {
  try {
    const emails = await prisma.email.findMany({
      include: { user: { select: { email: true } } },
      orderBy: { createdAt: 'desc' }
    });
<<<<<<< HEAD
    if(!emails || emails.length === 0){
=======
    if(!emails){
>>>>>>> 1d0c79a07aa0b5e8a41dfffab4f34fff6ed1220d
        return res.status(404).json({
            success: false,
            message: "No Emails found."
        })
    }
    res.json({ success: true, emails, message: "Emails fetched successfully." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
}

export const deleteUsers =  async (req, res) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.params.id } });
    if(!user){
        return res.status(404).json({
            success: false,
            message: "No User found with given id."
        })
    }
    res.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export const deleteEmail =  async (req, res) => {
  try {
    const email = await prisma.email.delete({ where: { id: req.params.id } });
    if(!email){
        return res.status(404).json({
            success: false,
            message: "No Email found with given id."
        })
    }
    res.json({ success: true, message: "Email deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete email' });
  }
}