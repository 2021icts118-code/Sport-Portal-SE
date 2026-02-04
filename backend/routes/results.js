const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

router.get('/', async (req, res) => res.json(await Result.find().populate('tournament').populate('event').populate('sport').populate('team1').populate('team2')));
router.get('/:id', async (req, res) => { const r = await Result.findById(req.params.id).populate('tournament').populate('event').populate('sport').populate('team1').populate('team2'); if (!r) return res.status(404).json({ message: 'Not found' }); res.json(r); });
router.post('/', async (req, res) => { const doc = new Result(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Result.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Result.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
