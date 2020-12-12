const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosDisponibles = require('../models/productoModel');
const compras = require('../models/compras');

router.get('/mostrar/precioFinal', (req, res) => {
    res.render('compras/finalizarCompra');
});

router.post('/compras/finalizarCompra', async (req, res) => {
    var errors = [];
    var compra = req.body.ProductoCompra;

    require('../index').compraActual;

    require('../index').compraActual = new compras;

    await productosDisponibles.findOne({ NombreProducto: compra }, async (errors, prod) => {
        if (!prod) {
            errors.push({ text: "mamando" });
            res.render('./mostrar/precioFinal', {
                errors
            });
        } else {
            console.log(require('../index').compraActual.NombreProducto = compras);
        }

    })

});

module.exports = router;