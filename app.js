const createError = require('http-errors');
const sequelize = require('./config/conexion.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const port=8000;

const Router = require('./routes/indexrouter')

app.use(session({
    secret: 'guessss',
    resave: false,
    saveUninitialized: false
}));

app.use('/',Router)

app.use(function(err, req, res, next ){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env')=== 'development' ? err : {}; 

    res.status(err.status || 500);
    res.render('error');
});


// Probar la conexión
sequelize.sync()
    .then(() => {
        console.log('Base de datos y tablas creadas correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la base de datos:', error);
    });

app.listen(port,()=>{
    console.log(`servidor corriendo exitosamente en el puerto ${port}`)
})
