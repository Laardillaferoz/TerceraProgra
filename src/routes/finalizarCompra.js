const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosDisponibles = require('../models/productoModel');
const compra = require('../models/compras');
const compras = require('../models/compras');




router.get('/mostrar/precioFinal', (req, res) => {
    res.render('compras/finalizarCompra');
});

router.post('/compras/finalizarCompra', async (req, res) => {
    var errors=[];
    var compras = req.body.ProductoCompra;
    
    console.log(require('../index').compraActual);
    
    require('../index').compraActual=new compras;
    
    console.log(require('../index').compraActual);

    await productosDisponibles.findOne({NombreProducto:producto}, async (res,req)=>{
        console.log(require('../index').compraActual.NombreProducto=producto);
    })
    
});

module.exports = router;

