const express = require('express');
const router = express.Router();
const usuario = require('../models/usuario');
const { isAuthenticated } = require('../helpers/auth');
const passport = require('passport');

//Cliente
router.get('/users/signin', (req, res) => {

    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/principal/userPrincipal',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

//Registro
router.get('/users/signup', async(req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async(req, res) => {
    const {
        name,
        lastName,
        birth,
        sex,
        user,
        email,
        password
    } = req.body;

    const errors = [];
    console.log(req.body)

    if (email.length <= 0) {
        errors.push({ text: "Por favor, ingrese su email" })
    }
    if (password.length <= 0) {
        errors.push({ text: "Por favor, ingrese una contraseña" })
    }

    if (password.length < 4) {
        errors.push({ text: "La contraseña debe tener un mínimo de 4 caracteres" });
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            lastName,
            birth,
            sex,
            user,
            email,
            password
        });
    } else {
        const nombreUsuario = await usuario.findOne({ email: email });
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
            email,
            password
        });
        await nuevoUsuario.save();
        console.log('JIJIJIJ');
        req.flash('success_msg', 'Usuario registrado');
        console.log('JIJIJIJ2');
        res.redirect('/users/signin');
    }

});

module.exports = router;