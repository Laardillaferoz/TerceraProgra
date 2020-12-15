const express= require('express');
const router = express.Router();
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("progra", "123"));
const session3= driver.session();


router.post('/consults/consult1',async(req,res)=>{
    var idClient=req.body.idClient;
    var errors=[];

    session3.run('MATCH (c:Cliente)')

})

module.exports = router;