const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const express = require('express');
const router = express.Router();

const ProductosCarrito = require('../models/compras');
const ProductosDisponibles = require('../models/productoModel');

router.get('/mostrar/precioFinal', (req, res) => {
    res.render('compras/finalizarCompra');
});


router.post("/compras/finalizarCompra", async (req, res) => {
    const { ProductosDisponibles} = req.body;
    const Todos = await registroProductos.find({ });
    console.log(Todos);
    res.render('compras/finalizarCompra', { Todos });
});

module.exports = router;