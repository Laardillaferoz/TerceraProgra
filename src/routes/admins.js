const express = require('express');
const router = express.Router();


router.get('/admins/principal', (req, res) => {
    res.render('admins/principal');
});

/*router.post('/admins/principal', passportA.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admins/login',
    failureFlash: true
}));*/

module.exports = router;