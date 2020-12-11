const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosDisponibles = require('../models/productoModel'); 
const compra = require('../models/compras'); 

router.get('/mostrar/finalizarCompra', (req, res) => {
    res.render('compras/finalizarCompra');
});

router.post('/compras/finalizarCompra', async (req, res) => {
    const productosComun = await compras.aggregate([
        {
            "$lookup": {
                "from": "productosDisponibles",
                "localField": "NombreDisponible",
                "foreignField": "NombreDisponible",
                "as": "productosUno"
            }
        },
        {
            "$unwind": "$productosUno"
        },
        {
            "$lookup": {
                "from": "compra",
                "localField": "ProductoCompra",
                "foreignField": "ProductoCompra",
                "as": "productosDos"
            }
        }, {
            "$match": {
                "idAerolinea": idAerolinea
            }
        }, {
            "$group": {
                "_id": "$vuelosAerolinea.idVuelo",
                "precio": {
                    "$sum": "$vuelosAerolinea.precio"
                },
                "Cantidad_Boletos_Vendidos": {
                    "$sum": "$ordenBoletos_Boletos.cantidadBoleto"
                }
            }
        }, {
            "$addFields": {
                "totalGananciaVuelo": {
                    "$sum": {
                        "$multiply": ["$precio", "$Cantidad_Boletos_Vendidos"]
                    }
                }

            }
        }
    ])
    for (var x = 0; x < infoAerolinea.length; x++) {
        var obj1 = infoAerolinea[x];
        // res.send(obj1);
        console.log(obj1);
    }
    res.render('compras/finalizarCompra', {obj1});
});

module.exports = router;
