const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        res.json(await Club.find().populate('sport').populate('captain', '-password'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Club.findById(req.params.id).populate('sport').populate('captain', '-password');
        if (!item) return res.status(404).json({ message: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('Received Club POST:', req.body);
        const doc = new Club(req.body);
        await doc.save();
        res.json(doc);
    } catch (err) {
        console.error('Club POST Error:', err);
        res.status(400).json({ message: err.message || 'Unknown error occurred', error: err.toString() });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.json(await Club.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Club.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Join request route
router.post('/:id/join', authMiddleware, async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) return res.status(404).json({ message: 'Club not found' });

        // Ensure arrays exist
        if (!club.members) club.members = [];
        if (!club.pendingMembers) club.pendingMembers = [];

        if (club.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already a member' });
        }
        if (club.pendingMembers.includes(req.user.id)) {
            return res.status(400).json({ message: 'Request already pending' });
        }

        club.pendingMembers.push(req.user.id);
        await club.save();
        res.json({ success: true, message: 'Join request sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
