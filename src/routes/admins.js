const express = require('express');
const router = express.Router();

router.get('/admins/principal', (req, res) => {
    res.render('admins/principal');
});

router.get('/admins/consultaBuscarCli', (req, res) => {
    res.render('admins/consultaBuscarCli');
});

router.get('/admins/consultaBuscarPro', (req, res) => {
    res.render('admins/consultaBuscarPro');
});

router.get('/admins/consultaVerPro', (req, res) => {
    res.render('admins/consultaVerPro');
});

router.get('/admins/consultaProComun', (req, res) => {
    res.render('admins/consultaProComun');
});

module.exports = router;