const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

router.post('/', async (req, res) => {
    const p = new Provider(req.body);
    await p.save();
    res.status(201).json(p);
});

router.get('/', async (req, res) => {
    const items = await Provider.find();
    res.json(items);
});

module.exports = router;