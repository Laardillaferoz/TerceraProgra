const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const express = require('express');
const router = express.Router();

const registroProductos = require('../models/compras');

router.get('/mostrar/carrito', (req, res) => {
    res.render('compras/carritoVista');
});


router.post("/compras/carritoVista", async (req, res) => {
    const { ProductoCompra } = req.body;
    const Todos = await registroProductos.find({ });
    console.log(Todos);
    res.render('compras/carritoVista', { Todos });
});

module.exports = router;

