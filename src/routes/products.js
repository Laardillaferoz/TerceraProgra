const express = require('express');
const router = express.Router();
const producto = require('../models/productoModel');
const fs = require('fs');
var bodyParser = require('body-parser');
const multer = require('multer');

router.get('/Products/ProductView', (req, res) => {
    res.render('Products/ProductView');
});

const ObjetoProducto = new producto();

router.post('/Products/ProductView', async (req, res) => {
    const {
        NombreArticulo,
        Marca,
        Precio,
        Edicion,
        Inventario,
        Vendidos,
        Imagen,
        TipoProducto
    } = req.body;

    const errors = [];
    console.log(req.body)

    if (NombreArticulo.length <= 0) {
        errors.push({ text: "Por favor, ingrese un nombre del articulo" })
    }
    if (Marca.length <= 0) {
        errors.push({ text: "Por favor, ingrese una Marca" })
    }
    if (Precio.length <= 0) {
        errors.push({ text: "Por favor, ingrese un Precio" })
    }
    if (Edicion.length <= 0) {
        errors.push({ text: "Por favor, ingrese una Edicion" })
    }
    if (Inventario.length <= 0) {
        errors.push({ text: "Por favor, ingrese un Cantidad en inventario" })
    }
    if (TipoProducto.length <= 0) {
        errors.push({ text: "Por favor, ingrese un tipo de producto" })
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
            Edicion,
            Inventario,
            Imagen,
            TipoProducto
        });
    } else {
        const BusProducto = await producto.findOne({ NombreArticulo: NombreArticulo });
        if (BusProducto) {
            req.flash('error_msg', 'Producto ya registrado');
            res.redirect('/Products/ProductView');
        } else {


            var path = 'C:/productos/' + Imagen;
            ObjetoProducto.NombreArticulo = NombreArticulo;
            ObjetoProducto.Marca = Marca;
            ObjetoProducto.Precio = Precio;
            ObjetoProducto.Edicion = Edicion;
            ObjetoProducto.Inventario = Inventario;
            ObjetoProducto.Vendidos = '0';
            ObjetoProducto.Imagen.data = fs.readFileSync(path);
            ObjetoProducto.Imagen.contentype = 'image/png';
            ObjetoProducto.TipoProducto = TipoProducto;
            res.render('Products/UsoDeportes', { ObjetoProducto });
        }
    }
});

router.get('/Products/useSports', (req, res) => {
    res.render('Products/UsoDeportes');
});

router.post('/Products/UsoDeportes', async (req, res) => {
    const { Deportes } = req.body;
    ObjetoProducto.Deportes.push({ Deportes });
    res.render('Products/UsoDeportes');
});

router.get('/Products/TerminaProducto', (req, res) => {
    res.render('Products/ProductView');
})

router.post('/Products/TerminaProducto', async (req, res) => {
    await ObjetoProducto.save();
    console.log('JIJIJIJ');
    req.flash('success_msg', 'Producto registrado');
    console.log('JIJIJIJ2');
    res.redirect('/Products/ProductView');
});

module.exports = router;