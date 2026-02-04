const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => res.json(await Event.find().populate('sport').populate('tournament')));
router.get('/:id', async (req, res) => { const e = await Event.findById(req.params.id).populate('sport').populate('tournament'); if(!e) return res.status(404).json({message:'Not found'}); res.json(e); });
router.post('/', async (req, res) => { const doc = new Event(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Event.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
