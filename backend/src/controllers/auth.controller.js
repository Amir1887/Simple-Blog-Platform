const { PrismaClient } = require('@prisma/client');
const { register, login } = require('../services/auth.service');

const prisma = new PrismaClient();
// registeration
const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await register(email, password, prisma);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed', error: error.message });
    }
  };

  // login
  const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await login(email, password, prisma);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
      res.status(401).json({ message: 'Login failed', error: error.message });
    }
  };
  module.exports = { registerUser, loginUser };