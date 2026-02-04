const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

router.get('/', async (req, res) => res.json(await Tournament.find().populate('sport')));
router.get('/:id', async (req, res) => { const t = await Tournament.findById(req.params.id).populate('sport'); if(!t) return res.status(404).json({message:'Not found'}); res.json(t); });
router.post('/', async (req, res) => { const doc = new Tournament(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => { res.json(await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true })); });
router.delete('/:id', async (req, res) => { await Tournament.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
