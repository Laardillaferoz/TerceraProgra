const { response } = require('express');
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

router.get('/admins/resultadoBuscarPro', (req, res) => {
    res.render('admins/resultadoBuscarPro');
});

router.post('/admins/consultaBuscarProEspe', async (req, res) => {
    var produc = req.body.NombreArticulo;
    var errors = [];
    console.log("El articulo es: ");
    console.log(produc);
    console.log("El articulo length es: ");
    console.log(produc.length);

    if (produc.length <= 0) {
        errors.push({ text: "Por favor ingrese un producto." })
    }
    if (errors.length > 0) {
        res.render('admins/consultaBuscarPro', { produc });
    }
    else {
        const buscPro = await producto.findOne({ NombreArticulo: produc });
        console.log("Los datos de buscPro es: ");
        console.log(buscPro);

        buscPro.save();

        if (buscPro) {
            res.render('admins/resultadoBuscarPro', { buscPro });
            return;
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