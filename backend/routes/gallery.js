const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

router.get('/', async (req, res) => res.json(await Gallery.find()));
router.get('/:id', async (req, res) => { const g = await Gallery.findById(req.params.id); if(!g) return res.status(404).json({message:'Not found'}); res.json(g); });
router.post('/', async (req, res) => { const doc = new Gallery(req.body); await doc.save(); res.json(doc); });
router.put('/:id', async (req, res) => res.json(await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Gallery.findByIdAndDelete(req.params.id); res.json({ success: true }); });

module.exports = router;
