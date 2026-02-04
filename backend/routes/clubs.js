const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/', async (req, res) => { res.json(await Club.find().populate('sport').populate('captain', '-password')); });
router.get('/:id', async (req, res) => { const item = await Club.findById(req.params.id).populate('sport').populate('captain', '-password'); if(!item) return res.status(404).json({message:'Not found'}); res.json(item); });
router.post('/', async (req, res) => { const doc = new Club(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => { res.json(await Club.findByIdAndUpdate(req.params.id, req.body, { new: true })); });
router.delete('/:id', async (req, res) => { await Club.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
