const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const jwtSecret = process.env.JWT_SECRET
// registeration
const register = async (email, password, prisma = new PrismaClient()) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw new Error('DataBase Error');
  }
};

// login
const login = async (email, password, prisma = new PrismaClient()) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });
    return { token, user: { id: user.id, email: user.email } }; // Return user info (except password)
  };

module.exports = { register, login };