const express= require('express');
const axios = require('axios');
const router = express.Router();
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
const session2= driver.session();

//MODELOS
const comprasModelo = require("../models/compras");
const usuarioModelo = require("../models/User");
const productoModelo = require("../models/productoModel");


router.get('/exportarDatos', async (req,res)=>{
    //PASAR DE MONGO A NEO4J

    const comprasCons = await comprasModelo.find();
    const usuarioCons = await usuarioModelo.find();
    const productosCons = await productoModelo.find();
    

    var success=[];

    //Array de los productos por pedido es
    var ArrayProductosPorPedido=[];
 
    //cliente con su pedido 
    var ArrayCompraPorCliente=[];

    var contadorUsuario=0;
    while(usuarioCons.length>contadorUsuario){ 

        ArrayCompraPorCliente.push(usuarioCons[contadorUsuario]);

        var contadorCompras=0;

        while(comprasCons.length>contadorCompras){

            if(comprasCons[contadorCompras].cliente==String(usuarioCons[contadorUsuario].email)){

                ArrayCompraPorCliente.push(comprasCons[contadorCompras])

            }

            contadorCompras += 1;

        }

        var Nombre=ArrayCompraPorCliente[0].name;
        var Apellido=ArrayCompraPorCliente[0].lastName;
        var FechaNa=ArrayCompraPorCliente[0].birth;
        var Sexo=ArrayCompraPorCliente[0].sex;
        var Usuario=ArrayCompraPorCliente[0].user;
        var Correo=ArrayCompraPorCliente[0].email;
        var Contrasenia=ArrayCompraPorCliente[0].password;
        var fecha=ArrayCompraPorCliente[0].date;

    
        //agrega el cliente primero
        session2
        .run("CREATE (n:Usuario {nombre:'"+Nombre+"',apellido:'"+Apellido+"',fechaNaciemiento:"+FechaNa+",sexo:'"+Sexo+"'"+
            ",usuario:'"+Usuario+"',correo:'"+Correo+"',contrasenia:'"+Contrasenia+"',fecha: '"+fecha+"'})"+
            "RETURN n")
        .then(function(result){
            //console.log(result.records[0]._fields[0].properties)
        })
        .catch(function(err){
        })

        var contadorComprasFinales=1;
        while(ArrayCompraPorCliente.length>contadorComprasFinales){

            var Cliente=ArrayCompraPorCliente[contadorComprasFinales].cliente;
            var FechaCompra=ArrayCompraPorCliente[contadorComprasFinales].FechaCompra;
            var Productos=ArrayCompraPorCliente[contadorComprasFinales].products;
            var PrecioFinal=ArrayCompraPorCliente[contadorComprasFinales].precioFinal;
            
            
            var productsP=[];
            var contadorIdsCompras=0;
            

            while(ArrayCompraPorCliente[contadorComprasFinales].productosCons.length>contadorIdsCompras){ 
                //DEFINIDO AL INCIO ESTE ARRAY
                console.log(ArrayCompraPorClienteo[contadorComprasFinales].productosCons[contadorIdsCompras].products)
                productsP.push(ArrayCompraPorCliente[contadorComprasFinales].productosCons[contadorIdsCompras].products)
                contadorIdsCompras+=1;
            }

            productsFinal.push(productsP)

            //agregar purchases
            session2
            .run("CREATE (n:Purchases {client:'"+clientP+"',supermarketName:'"+supermarketName+"',date:'"+date+"',status:'"+status+"',extraInformation:'"+extraInformation+"'"+
                ",finalPrice:"+finalPrice+",products:'"+productsP+"'})"+
                " RETURN n")
            .then(function(result){
                console.log(result.records[0]._fields[0].properties)
            })
            .catch(function(err){
            })
            ArrayProductosPorPedido+=1
        }

        //Relacion cliente con compras
        session2
        .run('MATCH (a:Client),(b:Purchases) WHERE a.idClient=b.client and a.idClient="'+arrayClientePedido[0].idClient+'" CREATE (a)-[r:didPurchase]->(b) RETURN r')
        .then(function(result){ 
            console.log(result.records[0]._fields[0].properties)
        })
        .catch(function(err){
        })

        arrayClientePedido=[];
        contadorCliente+=1;

    }

    //se agregan relaciones entre pedido y producto
    console.log(productsFinal)
    var contadorPrincipal=0;
    while(productsFinal.length>contadorPrincipal){

        console.log(1)
        var contadorInterno=1;

        while(productsFinal[contadorPrincipal].length>contadorInterno){
            console.log(2)
            session2
            .run('MATCH (a:Product),(b:Purchases) WHERE a.idProduct="'+productsFinal[contadorPrincipal][contadorInterno]+'"and b.extraInformation="'+productsFinal[contadorPrincipal][0]+'" CREATE (a)-[r:addedTo]->(b) RETURN r')
            .then(function(result){ 
                console.log(result.records[0]._fields[0].properties)
                
            })
            .catch(function(err){
            })

            contadorInterno+=1
        }

        contadorPrincipal+=1
    }
    success.push({text:"The migration was executed successfully"});
                res.render("Indexapp",{
                    success
                });




})

module.exports = router;
