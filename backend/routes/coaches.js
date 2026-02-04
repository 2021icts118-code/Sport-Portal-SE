const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');

router.get('/', async (req, res) => res.json(await Coach.find().populate('user').populate('sport')));
router.get('/:id', async (req, res) => { const c = await Coach.findById(req.params.id).populate('user').populate('sport'); if(!c) return res.status(404).json({message:'Not found'}); res.json(c); });
router.post('/', async (req, res) => { const doc = new Coach(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Coach.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
