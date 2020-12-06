const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario');


router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', async (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {
        name,
        lastName,
        birth,
        sex,
        user,
        password
    } = req.body;

    const errors = [];
    console.log(req.body)

    if (user.length <= 0) {
        errors.push({text: "Por favor, ingrese un nombre de usuario"})
    }
    if (password.length <= 0) {
        errors.push({text: "Por favor, ingrese una contraseña"})
    }

    if (password.length < 4) {
        errors.push({text: "La contraseña debe tener un mínimo de 4 caracteres"});
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            lastName,
            birth,
            sex,
            user,
            password
        });
    } else {
        const nombreUsuario = usuario.findOne({user: user});
        if (nombreUsuario) {
            req.flash('error_msg', 'Usuario ya registrado');
            res.redirect('/users/signup');
        }
        const nuevoUsuario = new usuario({
            name,
            lastName,
            birth,
            sex,
            user,
            password
        });
        await nuevoUsuario.save();
        req.flash('success_msg', 'Usuario registrado');
        res.redirect('/users/signin');
    }

});

module.exports = router;
