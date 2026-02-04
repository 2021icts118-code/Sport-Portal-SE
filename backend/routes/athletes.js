const express = require('express');
const router = express.Router();
const Athlete = require('../models/Athlete');

router.get('/', async (req, res) => res.json(await Athlete.find().populate('user').populate('sport')));
router.get('/:id', async (req, res) => { const a = await Athlete.findById(req.params.id).populate('user').populate('sport'); if(!a) return res.status(404).json({message:'Not found'}); res.json(a); });
router.post('/', async (req, res) => { const doc = new Athlete(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Athlete.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Athlete.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
