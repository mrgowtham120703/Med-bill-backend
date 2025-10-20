const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient')

router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
});

router.get('/:id', async (req, res) => {
    const p = await Patient.findById(req.params.id);
    if (!p)
        return res.status(404).json({ error: 'not found' });
    res.json(p);
});

module.exports = router;