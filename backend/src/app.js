const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const clientes = require('./modules/clients/rutas');
const usuarios = require('./modules/usuarios/rutas');
const auth = require('./modules/auth/rutas');
const error = require('./web/errors');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/clients', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);

app.use(error);

module.exports = app;