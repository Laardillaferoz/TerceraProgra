const express = require('express');
const router = express.Router();


router.get('/admins/principal', (req, res) => {
    res.render('admins/principal');
});

module.exports = router;