const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => res.json(await Schedule.find().populate('sport').populate('club')));
router.get('/:id', async (req, res) => { const s = await Schedule.findById(req.params.id).populate('sport').populate('club'); if(!s) return res.status(404).json({message:'Not found'}); res.json(s); });
router.post('/', async (req, res) => { const doc = new Schedule(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Schedule.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
