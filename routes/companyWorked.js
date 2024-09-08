const express = require('express');
const router = express.Router();
const CompanyWorked = require('../models/companyWorked');

// POST /api/company-worked
router.post('/', async (req, res) => {
  try {
    const companyWorked = new CompanyWorked(req.body);
    await companyWorked.save();
    res.status(201).json(companyWorked);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/company-worked/:id
router.get('/:id', async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findById(req.params.id);
    if (!companyWorked) return res.status(404).json({ error: 'CompanyWorked not found' });
    res.json(companyWorked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/company-worked/:id
router.put('/:id', async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!companyWorked) return res.status(404).json({ error: 'CompanyWorked not found' });
    res.json(companyWorked);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/company-worked/:id
router.delete('/:id', async (req, res) => {
  try {
    const companyWorked = await CompanyWorked.findByIdAndDelete(req.params.id);
    if (!companyWorked) return res.status(404).json({ error: 'CompanyWorked not found' });
    res.json({ message: 'CompanyWorked deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
