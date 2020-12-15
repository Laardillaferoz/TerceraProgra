const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../helpers/auth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Passport } = require('passport');

//Cliente
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/principal/userPrincipal', isAuthenticated, (req, res) => {
    res.render('principal/userPrincipal');
});


router.post('/users/signin', passport.authenticate('local'), async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var errors = [];

    var contrasena = "";
    var CorreoCliente;

    await User.findOne({ email: email }, async (err, resp) => {
        if (err) {
            console.log(err);
        }
        if (resp) {
            CorreoCliente = resp.email;
            contrasena = resp.password;
        }
    })

    await bcrypt.compare(password, contrasena, async (err, resp) => {
        if (err) {
            console.log(err);
        }
        if (contrasena == "") {
            errors.push({ text: "No se encuentra el usuario" });
            res.render("./users/signin", { errors })
            return;
        }
        if (resp) {
            require('../index').clienteActual = CorreoCliente;
            //require('../index').clienteActual=CorreoCliente;
            res.redirect("/principal/userPrincipal");
        } else {
            errors.push({ text: "Contraseña Incorrecta" });
            res.render("./users/signin", { errors })
        }
    })
});

//Registro
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, lastName, birth, sex, user, email, password } = req.body;
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
        res.render('users/signup', { errors, name, password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Usuario ya registrado');
            res.redirect('/users/signup');
        }
        const nuevoUsuario = new User({ name, lastName, birth, sex, user, email, password });
        nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
        await nuevoUsuario.save();
        console.log('JIJIJIJ');
        req.flash('success_msg', 'Usuario registrado');
        console.log('JIJIJIJ2');
        res.redirect('/users/signin');
    }

});

router.get('/users/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;