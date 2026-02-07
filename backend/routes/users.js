const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

const { authMiddleware } = require('../middleware/authMiddleware');

// PUT /api/users/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Permission check: User can update themselves, or admin can update anyone
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { firstName, lastName, phone, faculty, studentId } = req.body;

    // Only allow specific fields to be updated
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phone, faculty, studentId },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
