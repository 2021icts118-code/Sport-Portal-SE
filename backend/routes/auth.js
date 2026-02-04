const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, studentId, faculty, role } = req.body;

    // Default username to studentId if provided, else email prefix
    const username = req.body.username || studentId || email.split('@')[0];

    if (!email || !password || !username) return res.status(400).json({ message: 'username/studentId, email and password required' });

    const existing = await User.findOne({
      $or: [{ email }, { studentId: studentId || 'unique_placeholder' }, { username }]
    });

    if (existing) {
      if (existing.email === email) return res.status(400).json({ message: 'Email already registered' });
      if (existing.studentId === studentId) return res.status(400).json({ message: 'Student ID already registered' });
      return res.status(400).json({ message: 'Username/ID already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashed,
      firstName,
      lastName,
      phone,
      studentId,
      faculty,
      role
    });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    email = email.trim().toLowerCase();
    console.log(`Login attempt for: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User ${email} not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(`Login failed: Password mismatch for ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
