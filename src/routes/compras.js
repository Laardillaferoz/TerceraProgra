const express = require('express');
const { compraActual } = require('..');
const compras = require('../models/compras');
const productosDisponibles = require('../models/productoModel');
const router = express.Router();

router.get('/mostrar/compra', (req, res) => {
    res.render('compras/registrarCompra');
});

router.post('/compras/registrarCompra', async (req, res) => {
    var ProductoCompra = req.body.ProductoCompra;
    var Cantidad = req.body.Cantidad;

    var errors = [];
    var success = [];

    if (! ProductoCompra) {
        req.flash('error_msg' , "Ingrese el producto");
    }
    if (! Cantidad) {
        req.flash('error_msg' , "Cantidad ples");
    }
    if (errors.length > 0) {
        res.render("./compras/registrarCompra", {errors});
    } else {

        var productosD = require('../index').compraActual.ProductoCompra;

        await productosDisponibles.findOne({
            nombreArticulo: productosD
        }, async (err, found) => {
            if (!found) {
                req.flash('error_msg' , "El producto NO existe");
                res.render("./compras/registrarCompra", {errors});
            } else {
                if (parseInt(found.Cantidad) < parseInt(Cantidad)) {
                    req.flash('error_msg' , "No cantidad");
                    res.render("./compras/registrarCompra", {errors});
                } else {
                    var Actual  = require('../index').compraActual.precioFinal;
                    var precio = (parseInt(found.Precio) * parseInt(Cantidad));

                    require('../index').compraActual.nombreArticulo=ProductoCompra; 
                    require('../index').compraActual.Cantidad= Cantidad;
                    //require('../index').compraActual.Precio = (parseInt(compraActual) + parseInt(Precio));

                    req.flash('success_msg', 'Producto registrado');
                    res.render("./compras/registrarCompra", {success});
                }

            }
        })
    }
})

module.exports = router;