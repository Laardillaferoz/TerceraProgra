const express = require('express');
const router = express.Router();
const Promocion = require('../models/promocionModel');


router.get('/Products/Promocion', (req, res) => {
    res.render('Products/Promocion');
});

router.post('/Products/Promocion', async (req, res) => {
    const { NombrePromocion, Descripcion, NombreProducto, DescuentoRegalia, FechaInicio, FechaFin } = req.body;
    const errors = [];
    console.log(req.body)

    if (NombrePromocion.length <= 0) {
        errors.push({ text: "Por favor ingrese un nombre a la promocion" })
    }
    if (Descripcion.length <= 0) {
        errors.push({ text: "Por favor ingrese una descripcion a la promocion" })
    }
    if (NombreProducto.length <= 0) {
        errors.push({ text: "Por favor ingrese el nombre del producto al que desea agregar una promocion" })
    }
    /**if (DescuentoRegalia.length <= 0) {
        errors.push({ text: "Por favor ingrese si es un descuento o regalia y su respectiva informacion" })
    }*/
    if (FechaInicio.length <= 0) {
        errors.push({ text: "Por favor ingrese la fecha en la que inicia la promocion" })
    }
    if (FechaFin.length <= 0) {
        errors.push({ text: "Por favor ingrese la feha en la que finaliza la promocion" })
    }
    if (errors.length > 0) {
        res.render('Products/Promocion', {
            errors,
            NombrePromocion,
            Descripcion,
            NombreProducto,
            DescuentoRegalia,
            FechaInicio,
            FechaFin
        });
    }
    const nuevaPromocion = new Promocion({ NombrePromocion, Descripcion, NombreProducto, DescuentoRegalia, FechaInicio, FechaFin });
    console.log('JIJIJIJ0');
    await nuevaPromocion.save();
    console.log('JIJIJIJ1');
    req.flash('success_msg', 'Promocion agregada');
    console.log('JIJIJIJ2');
    res.redirect('/admins/principal');

    /**
    else {
        const BusPromocion = await promocion.findOne({ NombrePromocion: NombrePromocion });
        if (BusPromocion) {
            req.flash('error_msg', 'Promocion ya agregada');
            res.redirect('admins/principal');
        }
        else {
            const nuevaPromocion = new Promocion({ NombrePromocion, Descripcion, NombreProducto, DescuentoRegalia, FechaInicio, FechaFin });
            await nuevaPromocion.save();
            req.flash('success_msg', 'Promocion agregada');
            console.log('JIJIJIJ2');
            res.redirect('/admins/principal');
        }
    }
    */

});

module.exports = router;