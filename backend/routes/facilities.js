const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

router.get('/', async (req, res) => res.json(await Facility.find().populate('sports')));
router.get('/:id', async (req, res) => { const f = await Facility.findById(req.params.id).populate('sports'); if (!f) return res.status(404).json({ message: 'Not found' }); res.json(f); });
router.post('/', async (req, res) => { const doc = new Facility(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Facility.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
