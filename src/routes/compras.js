const express = require('express');
const compras = require('../models/compras');
const { findOneAndUpdate, countDocuments } = require('../models/productoModel');
const productosDisponibles = require('../models/productoModel');
const promocion = require('../models/promocionModel');
const router = express.Router();

router.get('/compras/registrarCompra', async(req, res) => {
    const ProductosHist = await productosDisponibles.find({});
    res.render('compras/registrarCompra', { ProductosHist });

});

require('../index').compraActual = new compras;
router.post('/compras/registrarCompra', async(req, res) => {
    var ProductoCompra = req.body.ProductoCompra;
    var Cantidad = req.body.Cantidad;

    var errors = [];
    var success = [];
    console.log(require('../index').compraActual);
    console.log(require('../index').compraActual);

    console.log('hola1');
    if (!ProductoCompra) {

        req.flash('error_msg', "Ingrese el producto");
    }
    if (!Cantidad) {
        errors.push({ text: "Debe ingresar la cantidad" });
    } else {
        require('../index').compraActual.cliente = require('../index').clienteActual;
        var productosD = require('../index').compraActual.ProductoCompra;

        await productosDisponibles.findOne({ NombreArticulo: ProductoCompra }, async(err, found) => {

            if (!found) {
                errors.push({ text: "Producto no exite" });
                res.render("./compras/registrarCompra", { errors });
            } else {
                if (parseInt(found.Inventario) < parseInt(Cantidad)) {
                    errors.push({ text: "No hay suficiente cantidad" });
                    res.render("./compras/registrarCompra", { errors });
                } else {


                    var Actual = require('../index').compraActual.precioFinal;
                    var precio = (parseInt(found.Precio) * parseInt(Cantidad));

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    today = dd + '/' + mm + '/' + yyyy;


                    require('../index').compraActual.products.push({ ProductoCompra: ProductoCompra, Cantidad: Cantidad, unitPrice: found.Precio, FechaCompra: today });
                    require('../index').compraActual.precioFinal = (parseInt(Actual) + parseInt(precio));

                    success.push({ text: "Se añadio producto" });

                    console.log(require('../index').compraActual);
                    console.log(require('../index').compraActual.products.length)
                    res.render("./compras/registrarCompra", { success });
                }

            }
        })
    }
});

router.post('/compras/finalCompra', async(req, res) => {
        var success = [];

        require('../index').compraActual.save();

        var i = 0;
        var largo = require('../index').compraActual.products.length;

        while (i < largo) {
            var ProductoCompra = require('../index').compraActual.products[i].ProductoCompra;
            var Inventario = require('../index').compraActual.products[i].Cantidad;


        await productosDisponibles.findOne({ NombreArticulo: ProductoCompra }, function (err, resp) {
            if (err) {
                console.log(err);
            } else {
                var cantidadvieja = resp.Inventario;
                console.log(cantidadvieja)
                var cantidadnueva = (parseInt(cantidadvieja) - parseInt(Inventario));
                resp.Inventario = cantidadnueva;
                console.log(cantidadnueva)
                resp.save();
            }
        });
        i++;
    }
    success.push({ text: 'Se ha registrado el producto, el precio final es: ' + require('../index').compraActual.precioFinal });
    res.render('./index', { success })
    delete require('../index').compraActual;
    require('../index').compraActual = new compras;
})
// router.get('/compras/finalCompra',(req,res)=>{
//     res.render('compras/registrarCompra')
//})


router.get('/compras/historialdeCompras', async (req, res) => {
    var clienteHistoria = require('../index').clienteActual;
    const comprasHist = await compras.find({ cliente: clienteHistoria });
    res.render('compras/historialdeCompras', { comprasHist });
});

module.exports = router;