const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

router.get('/', async (req, res) => {
    try {
        res.json(await Tournament.find().populate('sport'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const t = await Tournament.findById(req.params.id).populate('sport');
        if (!t) return res.status(404).json({ message: 'Not found' });
        res.json(t);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received Tournament POST:', req.body);
        const doc = new Tournament(req.body);
        await doc.save();
        res.json(doc);
    } catch (err) {
        console.error('Tournament POST Error:', err);
        res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Tournament.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
