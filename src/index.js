const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const compras = require('./models/compras');
const productoModel = require('./models/productoModel');

//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { json: function(context) { return JSON.stringify(context); } },
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
module.exports.compraActual=new compras;
//module.exports.clienteActual=new User;
module.exports.productosActuales=new productoModel;

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/admins'));
app.use(require('./routes/products'));
app.use(require('./routes/compras'));
app.use(require('./routes/carrito'));
app.use(require('./routes/finalizarCompra'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listenning
app.listen(app.get('port'), () => {
    console.log('CONECTÓ', app.get('port'))
});