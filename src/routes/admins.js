const express = require('express');
const router = express.Router();
const producto = require('../models/productoModel');

router.get('/admins/principal', (req, res) => {
    res.render('admins/principal');
});

router.get('/admins/consultaBuscarCli', (req, res) => {
    res.render('admins/consultaBuscarCli');
});

router.get('/admins/consultaBuscarPro', (req, res) => {
    res.render('admins/consultaBuscarPro');
});

router.post('/admins/consultaBuscarProEspe', async (req, res) => {
    var produc = req.body;
    var errors = [];
    console.log(req.body);

    if (produc.length <= 0) {
        errors.push({ text: "Por vafor ingrese un producto." })
    }
    if (errors.length > 0) {
        res.render('admins/consultaBuscarPro', { produc });
    }
    else {
        const buscPro = await producto.findOne({ produc: NombreArticulo });
        if (buscPro) {
            res.render('admins/consultaBuscarPro', { produc });
        }
        console.log('JIJIJIJ');
        res.redirect('/admins/consultaBuscarPro');
        console.log('JIJIJIJ2');
    }
});

router.get('/admins/consultaVerPro', async (req, res) => {
    const Productos = await producto.find();
    res.render('admins/consultaVerPro', { Productos });
});

router.get('/admins/consultaProComun', (req, res) => {
    res.render('admins/consultaProComun');
});

module.exports = router;