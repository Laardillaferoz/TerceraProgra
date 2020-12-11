const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosDisponibles = require('../models/productoModel');
const compra = require('../models/compras');


router.get('/mostrar/precioFinal', (req, res) => {
    res.render('compras/finalizarCompra');
});

router.post('/compras/finalizarCompra', async (req, res) => {
    const {compra} = req.body;
    const productosComun = await compra.aggregate([
        {
            "$lookup": {
                "from": "productosDisponibles",
                "localField": "NombreDisponible",
                "foreignField": "NombreDisponible",
                "as": "productosUno"
            }
        }, {
            "$unwind": "$productosUno"
        }, {
            "$lookup": {
                "from": "compra",
                "localField": "ProductoCompra",
                "foreignField": "ProductoCompra",
                "as": "productosDos"
            }
        }, {
            "$match": {
                "productosUno": compra
            }
        }
    ])
    for (var x = 0; x < compras.length; x++) {
        var obj1 = compras[x];
        console.log(obj1);
    }
    res.render('compras/finalizarCompra', {obj1});
});

module.exports = router;

