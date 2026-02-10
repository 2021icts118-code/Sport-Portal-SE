const express = require('express');
const router = express.Router();
const Sport = require('../models/Sport');

// GET all
router.get('/', async (req, res) => {
  const items = await Sport.find();
  res.json(items);
});

// GET by name
router.get('/name/:name', async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const item = await Sport.findOne({ name: new RegExp('^' + name + '$', 'i') });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Sport.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (error) {
    res.status(404).json({ message: 'Invalid ID or Not found' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    console.log('Received Sport POST:', req.body);
    const doc = new Sport(req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    console.error('Sport POST Error:', err);
    res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  const updated = await Sport.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Sport.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
