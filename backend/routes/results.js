const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

router.get('/', async (req, res) => {
    try {
        res.json(await Result.find().populate('tournament').populate('event').populate('sport').populate('team1').populate('team2'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const r = await Result.findById(req.params.id).populate('tournament').populate('event').populate('sport').populate('team1').populate('team2');
        if (!r) return res.status(404).json({ message: 'Not found' });
        res.json(r);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received Result POST:', req.body);
        const doc = new Result(req.body);
        await doc.save();
        await doc.populate('tournament');
        await doc.populate('event');
        await doc.populate('sport');
        await doc.populate('team1');
        await doc.populate('team2');
        res.json(doc);
    } catch (err) {
        console.error('Result POST Error:', err);
        res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await Result.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
