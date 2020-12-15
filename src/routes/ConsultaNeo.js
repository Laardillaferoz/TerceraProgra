const express = require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1234"));
const session3 = driver.session();


router.post('/admins/consultaBuscarCliNombre', async (req, res) => {
    var valor = req.body.Nombre;
    var errors = [];

    if (!valor) {
        errors.push({text: "Por favor, ingrese el valor de busqueda"});
        console.log('VAACIO');
        res.render("admins/consultaBuscarCli");

    } else {
        session3.run('MATCH (c:Usuario{nombre:"' + valor + '"})-->(Compro:Compra) return Compro')
        .then(function(resultado){
            var compra1=resultado.records[0]._fields[0].properties;
            var compra2=resultado.records[1]._fields[0].properties;
            var compra3=resultado.records[2]._fields[0].properties;


            res.render("admins/consultaBuscarCli",{compra1,compra2,compra3});
        })
        .catch(function(err){
            console.log(err);
        })

    }
})


module.exports = router;

