const express = require('express');
const router = express.Router();
const promocion = require('../models/promocionModel');

router.get('/Products/Promocion', (req, res) => {
    res.render('Products/Promocion');
});



module.exports = router;