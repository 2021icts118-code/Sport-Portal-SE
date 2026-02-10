const express = require('express');
const router = express.Router();
const TrainingProgram = require('../models/TrainingProgram');

router.get('/', async (req, res) => {
    try {
        res.json(await TrainingProgram.find().populate('sport').populate('coach'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const d = await TrainingProgram.findById(req.params.id).populate('sport').populate('coach');
        if (!d) return res.status(404).json({ message: 'Not found' });
        res.json(d);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received TrainingProgram POST:', req.body);
        const doc = new TrainingProgram(req.body);
        await doc.save();
        await doc.populate('sport');
        await doc.populate('coach');
        res.json(doc);
    } catch (err) {
        console.error('TrainingProgram POST Error:', err);
        res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await TrainingProgram.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await TrainingProgram.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
