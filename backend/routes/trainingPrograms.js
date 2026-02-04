const express = require('express');
const router = express.Router();
const TrainingProgram = require('../models/TrainingProgram');

router.get('/', async (req, res) => res.json(await TrainingProgram.find().populate('sport').populate('coach')));
router.get('/:id', async (req, res) => { const d = await TrainingProgram.findById(req.params.id).populate('sport').populate('coach'); if(!d) return res.status(404).json({message:'Not found'}); res.json(d); });
router.post('/', async (req, res) => { const doc = new TrainingProgram(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await TrainingProgram.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await TrainingProgram.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
