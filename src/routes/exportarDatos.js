const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
//const session2 = driver.session();

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
    var productsFinal=[];
    // Constantes que guardan los modelos
    console.log('constantes');
    const comprasCons = await comprasModelo.find();
    // console.log(comprasCons);
    const usuarioCons = await usuarioModelo.find();
    // console.log(usuarioCons[3]);
    const productosCons = await productoModelo.find();

    var success=[];


    var ArrayCompraPorCliente=[];
    // cliente con su compra
    // var arrayClientePedido=[];
    
    var contadorCliente = 0;
    while (usuarioCons.length > contadorCliente) {
        const session2 = driver.session();
        ArrayCompraPorCliente.push(usuarioCons[contadorCliente]);

        var contadorPedido = 0;
        while (comprasCons.length > contadorPedido) {

            if (comprasCons[contadorPedido].cliente == (usuarioCons[contadorCliente].email)) {

                ArrayCompraPorCliente.push(comprasCons[contadorPedido])

            }

            contadorPedido += 1;

        }
        var contadorUsuario = 0;
        //while (contadorUsuario < usuarioCons.length) {

            const Nombre = ArrayCompraPorCliente[0].name;
            const Lastname = ArrayCompraPorCliente[0].lastName;
            const FechaNa = ArrayCompraPorCliente[0].birth;
            //console.log(FechaNa);
            const Sexo = ArrayCompraPorCliente[0].sex;
            //console.log(Sexo);
            const Usuario = ArrayCompraPorCliente[0].user;
            //console.log(Usuario);
            const Correo = ArrayCompraPorCliente[0].email;
            //console.log(Correo);
            const Contrasenia = ArrayCompraPorCliente[0].password;
           // console.log(Contrasenia);
            //const fecha = usuarioCons[0].date;
            //console.log(fecha);


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

                const singleRecord = result.records[0]
                const node = singleRecord.get(0)

                // console.log(node.properties.name)
            } finally { // await session2.close()
            } //contadorUsuario += 1;
            console.log(contadorUsuario);
        //}



        //compras
        console.log('AgregarComprs');
        var contadorComprasFinales = 1;
        while (ArrayCompraPorCliente.length > contadorComprasFinales) {
    
            console.log(comprasCons);
    
            const Cliente = ArrayCompraPorCliente[contadorComprasFinales].cliente;
            var Productos = "";
            const PrecioFinal = ArrayCompraPorCliente[contadorComprasFinales].precioFinal;
            
            
            if (comprasCons[contadorComprasFinales].products) {
    
                var contadorProductos = 0;
                console.log(comprasCons[contadorComprasFinales].products[contadorProductos]);
    
                while (comprasCons[contadorComprasFinales].products.length > contadorProductos) {
    
                    console.log(comprasCons[contadorComprasFinales].products[contadorProductos]);
    
                    Productos+="Productos: "
                    Productos += String(comprasCons[contadorComprasFinales].products[contadorProductos].ProductoCompra) + ",";
                    Productos += String(comprasCons[contadorComprasFinales].products[contadorProductos].Cantidad) + ",";
                    Productos += comprasCons[contadorComprasFinales].products[contadorProductos].unitPrice + ",";
                    Productos += comprasCons[contadorComprasFinales].products[contadorProductos].FechaCompra + ",";
                    Productos+="  "
                    contadorProductos += 1;
                }
            }
    
            
            
            try {
                const result = await session2.run('CREATE (n:Compra {Cliente:$cliente,productos:$productos,precioFinal:$precioFinal }) RETURN n', {
                    cliente: Cliente,
                    productos: Productos,
                    precioFinal: PrecioFinal,
                    
                })
                const singleRecord = result.records[0]
                const node = singleRecord.get(0)
    
    
            } finally {} contadorComprasFinales += 1;
        }
    
    
        session2.run('MATCH (a:Usuario),(b:Compra) WHERE a.Email=b.Cliente and a.Email="' +ArrayCompraPorCliente[0].email+ '" CREATE (a)-[r:Compro]->(b) RETURN r').then(function (result) {
            console.log(result.records[0]._fields[0].properties)
        }).catch(function (err) {})

        ArrayCompraPorCliente=[];

        contadorCliente += 1;
        console.log(contadorCliente)
        //session2.close();
    }



        /*
        const productsMongo = productosCons.find();
        for(var i = 0; i < productsMongo.length; i++){
            const session10=driver.session;
            const product = productsMongo[i];
        // console.log(product);
            const Nombreart = product.NombreArticulo;
            const marca = product.Marca;
            const precio = product.Precio;
            const inventario = product.Inventario;
            const tipo = product.TipoProducto;

            session10
            .run('CREATE (n:Products {NombreArt: {nombreart}, Marca: {marca},Precio:{precio},Inventario:{inven},TipoProducto:{tipo}}) Return n',
            {nombreart: Nombreart, marca :marca,precio:precio,inven:inventario,tipo:tipo})
            .then(function(result){
                session.close();
                console.log("eerr");                
            })
            .catch(function(err){
                console.log("error");
                console.log(err);
            })
        };*/


    success.push({text:"Listo"});
    res.render("admins/principal",{success});
});





router.get('/eliminarDatosNeo', async (req, res) => {
    const session5 = driver.session();
    try {
        const result = await session5.run('MATCH (n) detach delete n', {           
        })
        //const singleRecord = result.records[0]
        //const node = singleRecord.get(0)


    } finally {}
    
    res.render("Admins/principal") 
    session5.close();
});

module.exports = router;

