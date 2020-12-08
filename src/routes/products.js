const express = require('express');
const router = express.Router();
const producto = require('../models/productoModel');

router.get('/Products/ProductView', (req, res) => {
    res.render('Products/ProductView');
});
/*
router.get('/users/signup', async (req, res) => {
    res.render('users/signup');
});
*/
router.post('/Products/ProductView', async (req, res) => {
    const {
        NombreArticulo,
        Marca,
        Precio,
        Deportes,
        Edicion,
        Inventario,
        Imagen,
        TipoProducto
    } = req.body;

    const errors = [];
    console.log(req.body)

    if (NombreArticulo.length <= 0) {
        errors.push({text: "Por favor, ingrese un nombre del articulo"})
    }
    if (Marca.length <= 0) {
        errors.push({text: "Por favor, ingrese una Marca"})
    }
    if (Precio.length <= 0) {
        errors.push({text: "Por favor, ingrese un Precio"})
    }
    if (Deportes.length <= 0) {
        errors.push({text: "Por favor, ingrese un deporte"})
    }
    if (Edicion.length <= 0) {
        errors.push({text: "Por favor, ingrese una Edicion"})
    }
    if (Inventario.length <= 0) {
        errors.push({text: "Por favor, ingrese un Cantidad en inventario"})
    }
    if (TipoProducto.length <= 0) {
        errors.push({text: "Por favor, ingrese un tipo de producto"})
    }
    /*
    if (TipoProducto.length < 4) {
        errors.push({text: "La contraseña debe tener un mínimo de 4 caracteres"});
    }*/

    if (errors.length > 0) {
        res.render('Products/ProductView', {
            NombreArticulo,
            Marca,
            Precio,
            Deportes,
            Edicion,
            Inventario,
            Imagen,
            TipoProducto
        });
    } else {
        const BusProducto = await producto.findOne({NombreArticulo: NombreArticulo});
        if (BusProducto) {
            req.flash('error_msg', 'Producto ya registrado');
            res.redirect('/Products/ProductView');
        }
        const nuevoProducto = new producto({
            NombreArticulo,
            Marca,
            Precio,
            Deportes,
            Edicion,
            Inventario,
            Imagen,
            TipoProducto
        });
        await nuevoProducto.save();
        console.log('JIJIJIJ');
        req.flash('success_msg', 'Producto registrado');
        console.log('JIJIJIJ2');
        res.redirect('/Products/ProductView');
    }

});

module.exports = router;
