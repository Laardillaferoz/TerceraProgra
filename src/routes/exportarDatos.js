const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
const session2 = driver.session();

// Agregar modelos
const comprasModelo = require("../models/compras");
const usuarioModelo = require("../models/User");
const productoModelo = require("../models/productoModel");


router.get('/exportarDatos', async (req, res) => {
    // PASAR DE MONGO A NEO4J

    // Constantes que guardan los modelos
    console.log('constantes');
    const comprasCons = await comprasModelo.find();
    const usuarioCons = await usuarioModelo.find();
    const productosCons = await productoModelo.find();


    var success = [];

    // Array de los productos por compra. nosé
    var ArrayProductosPorCompra = [];

    // Array del cliente con su compra.
    var ArrayCompraPorCliente = [];

    // Agregar usuario
    console.log('AgregarUsuario');
    var contadorUsuario = 0;
    while (usuarioCons.length > contadorUsuario) {

        var Nombre = usuarioCons[contadorUsuario].name;
        var Apellido = usuarioCons[contadorUsuario].lastName;
        var FechaNa = usuarioCons[contadorUsuario].birth;
        var Sexo = usuarioCons[contadorUsuario].sex;
        var Usuario = usuarioCons[contadorUsuario].user;
        var Correo = usuarioCons[contadorUsuario].email;
        var Contrasenia = usuarioCons[contadorUsuario].password;
        var fecha = usuarioCons[contadorUsuario].date;

        // Agrega el usuario primero a Neo
        session2.run("CREATE (n:Usuario {nombre:'" + Nombre + "',apellido:'" + Apellido + "',fechaNaciemiento:" + FechaNa + ",sexo:'" + Sexo + "'" + ",usuario:'" + Usuario + "',correo:'" + Correo + "',contrasenia:'" + Contrasenia + "',fecha: '" + fecha + "'})" + "RETURN n").then(function (result) {}).catch(function (err) {
            console.log('Se agrego el cliente a neo');
        })

        contadorUsuario += 1;
    
    }

    //cliente con su compra
    //var arrayClientePedido=[];

    var contadorCliente=0;
    while(usuarioCons.length>contadorCliente){ 

        ArrayCompraPorCliente.push(usuarioCons[contadorCliente]);

        var contadorPedido=0;
        while(comprasCons.length>contadorPedido){

            if(comprasCons[contadorPedido].cliente==(usuarioCons[contadorCliente].email)){

                ArrayCompraPorCliente.push(comprasCons[contadorPedido])

            }

            contadorPedido+=1;

        }
        contadorCliente+=1;
    }

    // Agregar productos

    console.log('AgregarProductos');
    var contadorProductosFinales = 0;
    while (productosCons.length > contadorProductosFinales) {

        var nombre = productosCons[contadorProductosFinales].NombreArticulo;
        var marca = productosCons[contadorProductosFinales].Marca;
        var precio = productosCons[contadorProductosFinales].Precio;
        var deportes = productosCons[contadorProductosFinales].Deportes;
        var edicion = productosCons[contadorProductosFinales].Edicion;
        var inventario = productosCons[contadorProductosFinales].Inventario;
        var imagen = productosCons[contadorProductosFinales].Imagen;
        var tipoP = productosCons[contadorProductosFinales].TipoProducto;

        // Agrega a neo
        session2.run("CREATE (n:Producto {nombre:'" + nombre + "',marca:'" + marca + "',precio:" + precio + ",deportes:'" + deportes + "'" + ",edicion:'" + edicion + "',inventario:'" + inventario + "',imagen:'" + imagen + "',tipoP:'" + tipoP + "'})" + "RETURN n").then(function (result) {}
        ).catch(function (err) {console.log('Se agrego el productos a neo')})

        contadorProductosFinales += 1;
    }

    // Agregar compras

    console.log('AgregarCompras');
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

        // Agrega la compra a neo
        session2.run("CREATE (n:Compras {cliente:'" + Cliente + "',FechaCompra:'" + FechaCompra + "',Productos:'" + Productos + "',precioFinal:'" + PrecioFinal + " RETURN n").then(function (result) {
            console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) { console.log('Se agrego la compra a neo');})
        ArrayCompraPorCliente += 1
    }

    // Relacion entre cliente y compras
    session2.run('MATCH (a:Usuario),(b:Compras) WHERE a.email=b.cliente "' + '" CREATE (a)-[r:didPurchase]->(b) RETURN r').then(function (result) {
        console.log(result.records[0]._fields[0].properties)
    }).catch(function (err) {})

    ArrayCompraPorCliente = [];
    


    // Relaciones entre compra y producto

    console.log(ArrayProductosPorCompra)
    var contadorPrincipal = 0;
    while (ArrayProductosPorCompra.length > contadorPrincipal) {

        console.log(1)
        var contadorInterno = 1;

        while (ArrayProductosPorCompra[contadorPrincipal].length > contadorInterno) {
            console.log(2)
            session2.run('MATCH (a:Producto),(b:Compras) WHERE a.NombreArticulo="' + ArrayProductosPorCompra[contadorPrincipal][contadorInterno] + '"and b.Productos.ProductoCompra="' + ArrayProductosPorCompra[contadorPrincipal][0] + '" CREATE (a)-[r:Pertenece]->(b) RETURN r').then(function (result) {
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

