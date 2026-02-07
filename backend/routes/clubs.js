const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => { res.json(await Club.find().populate('sport').populate('captain', '-password')); });
router.get('/:id', async (req, res) => { const item = await Club.findById(req.params.id).populate('sport').populate('captain', '-password'); if (!item) return res.status(404).json({ message: 'Not found' }); res.json(item); });
router.post('/', async (req, res) => { const doc = new Club(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => { res.json(await Club.findByIdAndUpdate(req.params.id, req.body, { new: true })); });
router.delete('/:id', async (req, res) => { await Club.findByIdAndDelete(req.params.id); res.json({ success: true }); });

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
