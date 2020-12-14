const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
const session2 = driver.session();

// Agregar modelos
const comprasModelo = require("../models/compras");
const usuarioModelo = require("../models/User");
const productoModelo = require("../models/productoModel");
router.get('/hola'),
async (req, res) => {
    res.render('/prueba')
} 
router.get('/exportarDatos', async (req, res) => {
    // PASAR DE MONGO A NEO4J

    // Constantes que guardan los modelos
    console.log('constantes');
    const comprasCons = await comprasModelo.find();
    // console.log(comprasCons);
    const usuarioCons = await usuarioModelo.find();
    //console.log(usuarioCons[3]);
    const productosCons = await productoModelo.find();

    var contadorUsuario = 0;
    while (contadorUsuario < usuarioCons.length) {

        const Nombre = usuarioCons[contadorUsuario].name;
        const Lastname = usuarioCons[contadorUsuario].lastName;
        const FechaNa = usuarioCons[contadorUsuario].birth;
        console.log(FechaNa);
        const Sexo = usuarioCons[contadorUsuario].sex;
        console.log(Sexo);
        const Usuario = usuarioCons[contadorUsuario].user;
        console.log(Usuario);
        const Correo = usuarioCons[contadorUsuario].email;
        console.log(Correo);
        const Contrasenia = usuarioCons[contadorUsuario].password;
        console.log(Contrasenia);
        const fecha = usuarioCons[contadorUsuario].date;
        console.log(fecha);


        const personName = 'Alice';
        try {
            const result = await session2.run('CREATE (n:Usuario {nombre:$name,Apellido:$apellido,FechaNacimiento:$fechaNac,Sexo:$sexo,Usuario:$usuario,Email:$email,pass:$contrasena}) RETURN n', {
                name: Nombre,
                apellido: Lastname,
                fechaNac: FechaNa,
                sexo: Sexo,
                usuario: Usuario,
                email: Correo,
                contrasena: Contrasenia
            }
            // { apellido: Lastname}
            )

            // CREATE (n:Usuario {nombre:$name,Apellido:$apellido,FechaNacimiento:$fechaNac,Sexo:$sexo,Usuario:$Usuario,Email:$Email,pass:$Contrasena,fecha:$fecha}) RETURN n
            // { name: Nombre , apellido:Lastname,fechaNac:FechaNa,sexo:Sexo,Usuario:Usuario,Email:Correo,Contrasena:Contrasenia,fecha:fecha}

            const singleRecord = result.records[0]
            const node = singleRecord.get(0)

            // console.log(node.properties.name)
        } finally { // await session2.close()
        } contadorUsuario += 1;
        console.log(contadorUsuario);
    }
    // on application exit:
    // await driver.close()
/*
    
    //var success = [];

    // Array de los productos por compra. nosé
    //var ArrayProductosPorCompra = [];

    // Array del cliente con su compra.
    var ArrayCompraPorCliente = [];
    //var Nombre1 = usuarioCons[0].name;
    //console.log(Nombre1);
    // Agregar usuario
    console.log('AgregarUsuario');
    var contadorUsuario=0;
    while (contadorUsuario < usuarioCons.length ) {
        
        var Nombre = usuarioCons[contadorUsuario].name;
        console.log(Nombre);
        var Apellido = usuarioCons[contadorUsuario].lastName;
        console.log(Apellido);
        var FechaNa = usuarioCons[contadorUsuario].birth;
        console.log(FechaNa);
        var Sexo = usuarioCons[contadorUsuario].sex;
        console.log(Sexo);
        var Usuario = usuarioCons[contadorUsuario].user;
        console.log(Usuario);
        var Correo = usuarioCons[contadorUsuario].email;
        console.log(Correo);
        var Contrasenia = usuarioCons[contadorUsuario].password;
        console.log(Contrasenia);
        var fecha = usuarioCons[contadorUsuario].date;
        console.log(fecha);
        // Agrega el usuario primero a Neo
        session2
        .run("CREATE (n:Usuario {nombre:'"+Nombre+"' ,apellido:'"+Apellido+"' ,fechaNaciemiento:'"+FechaNa+"' ,sexo:'"+Sexo+"' ,usuario:'"+Usuario+"' ,correo:'" + Correo + "' ,contrasenia:'" + Contrasenia + "' ,fecha: '" + fecha + "'})" + "RETURN n")
        .then(function (result) {})
        .catch(function (err) {
            console.log('Se agrego el cliente a neo');
        })
        console.log(session2);
        contadorUsuario+=1;
        
    }
*/

    // cliente con su compra
    // var arrayClientePedido=[];
    var ArrayCompraPorCliente = [];
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

        const Nombre = productosCons[contadorProductosFinales].NombreArticulo;
        const Marca = productosCons[contadorProductosFinales].Marca;
        const Precio = productosCons[contadorProductosFinales].Precio;
        const Edicion = productosCons[contadorProductosFinales].Edicion;
        const Inventario = productosCons[contadorProductosFinales].Inventario;
        //const Imagen = productosCons[contadorProductosFinales].Imagen;
        const TipoP = productosCons[contadorProductosFinales].TipoProducto;
        var sports = "";

        //console.log(productosCons);
        if(productosCons[contadorProductosFinales].Deportes){

            var contadorDeportes=0;
            console.log(productosCons[contadorProductosFinales].Deportes[contadorDeportes]);
            
            while(productosCons[contadorProductosFinales].Deportes.length>contadorDeportes){ 

                console.log(productosCons[contadorProductosFinales].Deportes[contadorDeportes]);

                //Deportes+="Deporte: "
                sports+=String(productosCons[contadorProductosFinales].Deportes[contadorDeportes].Deportes)+",";
                //Deportes+="  "
                contadorDeportes+=1;
            }

        }
        // Agrega a neo

        try {
            const result = await session2.run('CREATE (n:Producto {Nombre:$nombre,Marca:$marca,Precio:$precio,Deportes:$deportes,Edicion:$edicion,Inventario:$inventario,TipoP:$tipoP}) RETURN n', {
                nombre: Nombre,
                marca: Marca,
                precio: Precio,
                deportes: sports,
                edicion: Edicion,
                inventario: Inventario,
                //imagen: Imagen,
                tipoP: TipoP
                
            })
            console.log('NEO PRODUCTOS');
            const singleRecord = result.records[0]
            const node = singleRecord.get(0)
        } finally {
            //await session2.close();
        }
        // session2.run("CREATE (n:Producto {nombre:'" + nombre + "',marca:'" + marca + "',precio:" + precio + ",deportes:'" + deportes + "'" + ",edicion:'" + edicion + "',inventario:'" + inventario + "',imagen:'" + imagen + "',tipoP:'" + tipoP + "'})" + "RETURN n").then(function (result) {}
        // ).catch(function (err) {console.log('Se agrego el productos a neo')})

        contadorProductosFinales += 1;
    }
    
    // Agregar compras

    console.log('AgregarCompras');
    var contadorComprasFinales = 0;
    while (comprasCons.length > contadorComprasFinales) {

        console.log(comprasCons);
       
        //const FechaCompra = comprasCons[contadorComprasFinales].FechaCompra;
        const Productos = "";
        const PrecioFinal = comprasCons[contadorComprasFinales].precioFinal;
        const Cliente = comprasCons[contadorComprasFinales].cliente;

        if(comprasCons[contadorComprasFinales].products){

            var contadorProductos=0;
            console.log(comprasCons[contadorComprasFinales].products[contadorProductos]);
            
            while(comprasCons[contadorComprasFinales].products.length>contadorProductos){ 

                console.log(comprasCons[contadorComprasFinales].products[contadorProductos]);

                //Deportes+="Deporte: "
                sports+=String(comprasCons[contadorComprasFinales].products[contadorProductos].products)+",";
                //Deportes+="  "
                contadorProductos+=1;
            }

        }


        // Agrega la compra a neo
        try {
            const result = await session2.run(
            'CREATE (n:Compra {Cliente: $cliente, productos: $productos, precioFinal: $precioFinal}) RETURN n',
            { productos:Productos, precioFinal:PrecioFinal, cliente:Cliente}
            //{ apellido: Lastname}
            )
                
            //CREATE (n:Usuario {nombre:$name,Apellido:$apellido,FechaNacimiento:$fechaNac,Sexo:$sexo,Usuario:$Usuario,Email:$Email,pass:$Contrasena,fecha:$fecha}) RETURN n
            //{ name: Nombre , apellido:Lastname,fechaNac:FechaNa,sexo:Sexo,Usuario:Usuario,Email:Correo,Contrasena:Contrasenia,fecha:fecha}

            const singleRecord = result.records[0]
            const node = singleRecord.get(0)
        
            //console.log(node.properties.name)
        } finally {
            //await session2.close()
        } contadorComprasFinales+=1;
    }
    /*
    // Relacion entre cliente y compras
    session2.run('MATCH (a:Usuario),(b:Compras) WHERE a.email=b.cliente "' + '" CREATE (a)-[r:didPurchase]->(b) RETURN r').then(function (result) {
        console.log(result.records[0]._fields[0].properties)
    }).catch(function (err) {})

    ArrayCompraPorCliente = [];
    

    /*
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
*/
});


module.exports = router;

