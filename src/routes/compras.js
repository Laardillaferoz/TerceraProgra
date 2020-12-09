const express = require('express');
const compras = require('../models/compras');
const router = express.Router();


router.get('/compras/registrarCompra', (req, res) => {
    res.render('compras/registrarCompra');
});


router.post('/compras/registrarCompra', async (req, res) => {
    const {ProductoCompra, Cantidad} = req.body;
    const errors = [];
    console.log(req.body)

    if (ProductoCompra.length<= 0) {
        errors.push({text: "Por favor, ingrese algún producto"})
    }
    if (Cantidad.length <= 0) {
        errors.push({ text: "Por favor, ingrese la cantidad" })
    }
    if (errors.length > 0) {
        res.render('compras/registrarCompra', {errors, ProductoCompra, Cantidad});
    }
    const nuevaCompra = new compras({ProductoCompra, Cantidad});
    await nuevaCompra.save();
    console.log('JIJIJIJ');
    req.flash('success_msg', 'Producto registrado');
    console.log('JIJIJIJ2');
    res.redirect('/compras/registrarCompra');

});
module.exports = router;
