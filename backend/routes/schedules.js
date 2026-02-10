const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => {
    try {
        res.json(await Schedule.find().populate('sport').populate('club'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const s = await Schedule.findById(req.params.id).populate('sport').populate('club');
        if (!s) return res.status(404).json({ message: 'Not found' });
        res.json(s);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received Schedule POST:', req.body);
        const doc = new Schedule(req.body);
        await doc.save();
        await doc.populate('sport');
        await doc.populate('club');
        res.json(doc);
    } catch (err) {
        console.error('Schedule POST Error:', err);
        res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
