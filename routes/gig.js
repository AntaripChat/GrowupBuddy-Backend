const express = require('express');
const router = express.Router();
const Event = require('../models/gig');

// POST /api/gigs
router.post('/', async (req, res) => {
  try {
    // Assuming you have a Gig model
    const gig = new Gig(req.body);
    await gig.save();
    res.status(201).json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/gigs/:id
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/gigs/:id
router.put('/:id', async (req, res) => {
  try {
    const gig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/gigs/:id
router.delete('/:id', async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    res.json({ message: 'Gig deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
