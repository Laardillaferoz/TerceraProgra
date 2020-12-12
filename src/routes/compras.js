const express = require('express');
//const { compraActual } = require('..');
const compras = require('../models/compras');
const productosDisponibles = require('../models/productoModel');
const router = express.Router();

router.get('/compras/registrarCompra', (req, res) => {
    res.render('compras/registrarCompra');
});

router.post('/compras/registrarCompra', async (req, res) => {
    var ProductoCompra = req.body.ProductoCompra;
    var Cantidad = req.body.Cantidad;

    var errors = [];
    var success = [];
    console.log(require('../index').compraActual);
    require('../index').compraActual=new compras;
    console.log(require('../index').compraActual);

    console.log('hola1');
    if (! ProductoCompra) {
        console.log('ella');
        req.flash('error_msg' , "Ingrese el producto");
    }
    if (! Cantidad) {
        console.log('NO me');
        errors.push({text:"You must enter the quantity"});
    }
    //if (errors.length > 0) {
     ///   console.log('me ama');
     //   res.render("./compras/registrarCompra", {errors});
    //}
     else {
        console.log('aquo');
        var productosD = require('../index').compraActual.ProductoCompra;

        await productosDisponibles.findOne({NombreArticulo: ProductoCompra}, async (err, found) => {
            console.log('No esta');
            if (!found) {
                errors.push({text:"Producto no exite"});
                //req.flash('error_msg' , "El producto NO existe");
                res.render("./compras/registrarCompra", {errors});
            } else {
                if (parseInt(found.Inventario) < parseInt(Cantidad)) {
                    errors.push({text:"No hay suficuente caridad"});
                    //req.flash('error_msg' , "No cantidad");
                    res.render("./compras/registrarCompra", {errors});
                } else {
                    var Actual  = require('../index').compraActual.precioFinal;
                    var precio = (parseInt(found.Precio) * parseInt(Cantidad));
                    
                    require('../index').compraActual.products.push({ProductoCompra:ProductoCompra,Cantidad:Cantidad,unitPrice:found.precio}); 
                    require('../index').compraActual.precioFinal= (parseInt(Actual)+parseInt(precio));
                    //require('../index').compraActual.Precio = (parseInt(compraActual) + parseInt(Precio));
                    console.log('hola');
                    success.push({text:"Se añadio producto"});
                    console.log('aquiajfbdak');
                    //req.flash('success_msg', 'Producto registrado');
                    console.log(require('../index').compraActual);
                    console.log(require('../index').compraActual.products.length)
                    res.render("./compras/registrarCompra", { success });
                }

            }
        })
    }
})

router.post('/compras/finalCompra',async(req,res)=>{
    var success=[];

    require('../index').compraActual.save();

    var i=0;
    var largo=require('../index').compraActual.products.length;

    while(i<largo){
        var ProductoCompra=require('../index').compraActual.products[i].ProductoCompra;
        var Inventario=require('../index').compraActual.products[i].Cantidad;


        await productosDisponibles.findOne({NombreArticulo:ProductoCompra},function(err,resp){
            if(err){
                console.log(err);
            }else{
                var cantidadvieja=resp.Inventario;
                console.log(cantidadvieja)
                var cantidadnueva=(parseInt(cantidadvieja)-parseInt(Inventario));
                resp.Inventario=cantidadnueva;
                console.log(cantidadnueva)
                resp.save();
            }
        });
        i++;
    }
    success.push({text:'Se ha registrado el producto, el precio final es: '+require('../index').compraActual.precioFinal});
    res.render('./index',{success})
})
 router.get('/compras/finalCompra',(req,res)=>{
     res.render('compras/registrarCompra')
 })
module.exports = router;