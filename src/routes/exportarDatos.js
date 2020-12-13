const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver").v4;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("TerceraProgra", "1234"));
const session1 = driver.session();

// Modelos
const CompraModelo = require("../models/compras");
const ProductoModelo = require("../models/productoModel");
const usuarioModelo = require("../models/promocionModel");

router.get('/exportarDatos', async (req, res) => { // De Mongo a NEO

    const comprasCons = await CompraModelo.find();
    const productoCons = await ProductoModelo.find();
    const usuarioCons = await usuarioModelo.find();


    var success = [];

    // Array productos por compra
    var ArrayProductosPorCompra = [];


    // Agregar usuario
    var contadorUsuario = 0;

    while (usuarioModelo.length > contadorUsuario) {

        var nombreU = usuarioModelo[contadorUsuario].name;
        var apellidoU = usuarioModelo[contadorUsuario].lastName;
        var fechaNaU = usuarioModelo[contadorUsuario].birth;
        var sexoU = usuarioModelo[contadorUsuario].sex;
        var usuarioU = usuarioModelo[contadorUsuario].user
        var emailU = usuarioModelo[contadorUsuario].email;
        var contraseniaU = usuarioModelo[contadorUsuario].password;
        var fechaU = usuarioModelo[contadorUsuario].date;


        session2.run("CREATE (n:Usuario {nombre:'" + nombreU + "',apellido:'" + apellidoU + "' , fechaNacimiento:'" + fechaNaU + "', Sexo:'" + sexoU + "', Usuario:'" + usuarioU + "', Email:'" + emailU + "', Contrasenia:'" + contraseniaU + "', Fecha:'" + fechaU + "'})" + "RETURN n").then(function (result) {}).catch(function (err) {
            console.log("hola")
        })

        contadorUsuario += 1;
    }

    // Asociar compras a los clientes

    var arrayCompraPorCliente = [];

    var contadorUser = 0;
    while (usuarioCons.length > contadorUser) {
        arrayCompraPorCliente.push(usuarioCons[contadorUser]);

        var contadorCompras = 0;
        while (comprasCons.length > contadorCompras) {
            if (comprasCons[contadorCompras].cliente == String(usuarioCons[contadorUser].name)) {
                arrayCompraPorCliente.push(comprasCons[contadorCompras])
            }
            contadorCompras += 1;
        }
    }

    var contadorPedidosFinales = 1;

    while (arrayCompraPorCliente.length > contadorPedidosFinales) {
        var cliente = arrayCompraPorCliente[contadorPedidosFinales].cliente;
        var productos = arrayCompraPorCliente[contadorPedidosFinales].products;
        var precioFinal = arrayCompraPorCliente[contadorPedidosFinales].precioFinal;

        var productsP = [];
        var contadorIdsPurchases = 0;
        while (arrayCompraPorCliente[contadorPedidosFinales].productoCons.length > contadorIdsPurchases) {
            console.log(arrayCompraPorCliente[contadorPedidosFinales].productoCons[contadorIdsPurchases].NombreArticulo)
            productsP.push(arrayClientePedido[contadorPedidosFinales].productoCons[contadorIdsPurchases].NombreArticulo)
            contadorIdsPurchases += 1;
        }

        productsFinal.push(productsP)

        // Agregar compras
        session.run("CREATE (n:Compras {Cliente:'" + cliente + "',Producto:'" + productos + "',Precio Final:'" + precioFinal + " RETURN n").then(function (result) {
            console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) {})
        contadorPedidosFinales += 1
    }

    // Relación entre cliente y compras

    session.run('MATCH (a:Usuario),(b:Compras) WHERE a._id=b._id and a._id="' + arrayClientePedido[0]._id + '" CREATE (a)-[r:didPurchase]->(b) RETURN r').then(function (result) {
        console.log(result.records[0]._fields[0].properties)
    }).catch(function (err) {})

    arrayClientePedido = [];
    contadorCliente += 1;

    success.push({text: "The migration was executed successfully"});
    res.render("prueba", {success});
    driver.close();

})

module.exports = router;