const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
const session2 = driver.session();

// MODELOS
const comprasModelo = require("../models/compras");
const usuarioModelo = require("../models/User");
const productoModelo = require("../models/productoModel");


router.get('/exportarDatos', async (req, res) => { // PASAR DE MONGO A NEO4J

    const comprasCons = await comprasModelo.find();
    const usuarioCons = await usuarioModelo.find();
    const productosCons = await productoModelo.find();


    var success = [];

    // Array de los productos por pedido es
    var ArrayProductosPorPedido = [];

    // cliente con su pedido
    var ArrayCompraPorCliente = [];

    var contadorUsuario = 0;
    while (usuarioCons.length > contadorUsuario) {

        ArrayCompraPorCliente.push(usuarioCons[contadorUsuario]);

        var contadorCompras = 0;

        while (comprasCons.length > contadorCompras) {

            if (comprasCons[contadorCompras].cliente == String(usuarioCons[contadorUsuario].email)) {

                ArrayCompraPorCliente.push(comprasCons[contadorCompras])

            }

            contadorCompras += 1;

        }

        var Nombre = ArrayCompraPorCliente[0].name;
        var Apellido = ArrayCompraPorCliente[0].lastName;
        var FechaNa = ArrayCompraPorCliente[0].birth;
        var Sexo = ArrayCompraPorCliente[0].sex;
        var Usuario = ArrayCompraPorCliente[0].user;
        var Correo = ArrayCompraPorCliente[0].email;
        var Contrasenia = ArrayCompraPorCliente[0].password;
        var fecha = ArrayCompraPorCliente[0].date;


        // agrega el cliente primero
        session2.run("CREATE (n:Usuario {nombre:'" + Nombre + "',apellido:'" + Apellido + "',fechaNaciemiento:" + FechaNa + ",sexo:'" + Sexo + "'" + ",usuario:'" + Usuario + "',correo:'" + Correo + "',contrasenia:'" + Contrasenia + "',fecha: '" + fecha + "'})" + "RETURN n").then(function (result) { // console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) {})

        var contadorComprasFinales = 1;
        while (ArrayCompraPorCliente.length > contadorComprasFinales) {

            var Cliente = ArrayCompraPorCliente[contadorComprasFinales].cliente;
            var FechaCompra = ArrayCompraPorCliente[contadorComprasFinales].FechaCompra;
            var Productos = ArrayCompraPorCliente[contadorComprasFinales].products;
            var PrecioFinal = ArrayCompraPorCliente[contadorComprasFinales].precioFinal;


            var productsP = [];
            var contadorIdsCompras = 0;


            while (ArrayCompraPorCliente[contadorComprasFinales].productosCons.length > contadorIdsCompras) { // DEFINIDO AL INCIO ESTE ARRAY
                console.log(ArrayCompraPorCliente[contadorComprasFinales].productosCons[contadorIdsCompras].products)
                productsP.push(ArrayCompraPorCliente[contadorComprasFinales].productosCons[contadorIdsCompras].products)
                contadorIdsCompras += 1;
            }

            productsFinal.push(productsP)

            // agregar purchases
            session2.run("CREATE (n:Compras {cliente:'" + Cliente + "',FechaCompra:'" + FechaCompra + "',Productos:'" + Productos + "',precioFinal:'" + PrecioFinal + " RETURN n").then(function (result) {
                console.log(result.records[0]._fields[0].properties)
            }).catch(function (err) {})
            ArrayCompraPorCliente += 1
        }

        // Relacion cliente con compras
        session2.run('MATCH (a:Usuario),(b:Compras) WHERE a.email=b.cliente "' + '" CREATE (a)-[r:didPurchase]->(b) RETURN r').then(function (result) {
            console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) {})

        ArrayCompraPorCliente = [];
        contadorUsuarios += 1;

    }

    var contadorProductosFinales = 1;
    while (productosCons.length > contadorProductosFinales) {

        var nombre = productosCons[contadorProductosFinales].NombreArticulo;
        var marca = productosCons[contadorProductosFinales].Marca;
        var precio = productosCons[contadorProductosFinales].Precio;
        var deportes = productosCons[contadorProductosFinales].Deportes;
        var edicion = productosCons[contadorProductosFinales].Edicion;
        var inventario = productosCons[contadorProductosFinales].Inventario;
        var imagen = productosCons[contadorProductosFinales].Imagen;
        var tipoP = productosCons[contadorProductosFinales].TipoProducto;

        session2.run("CREATE (n:Producto {nombre:'" + nombre + "',marca:'" + marca + "',precio:" + precio + ",deportes:'" + deportes + "'" + ",edicion:'" + edicion + "',inventario:'" + inventario + "',imagen:'" + imagen + "',tipoP:'" + tipoP + "'})" + "RETURN n").then(function (result) { // console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) {})

        contadorProductosFinales += 1
    }

    // se agregan relaciones entre Compra y producto
    console.log(ArrayProductosPorPedido)
    var contadorPrincipal = 0;
    while (ArrayProductosPorPedido.length > contadorPrincipal) {

        console.log(1)
        var contadorInterno = 1;

        while (ArrayProductosPorPedido[contadorPrincipal].length > contadorInterno) {
            console.log(2)
            session2.run('MATCH (a:Producto),(b:Compras) WHERE a.NombreArticulo="' + ArrayProductosPorPedido[contadorPrincipal][contadorInterno] + '"and b.Productos.ProductoCompra="' + ArrayProductosPorPedido[contadorPrincipal][0] + '" CREATE (a)-[r:Pertenece]->(b) RETURN r').then(function (result) {
                console.log(result.records[0]._fields[0].properties)

            }).catch(function (err) {})

            contadorInterno += 1
        }

        contadorPrincipal += 1
    }
    success.push({text: "The migration was executed successfully"});
    res.render("prueba", {success});


})

module.exports = router;

