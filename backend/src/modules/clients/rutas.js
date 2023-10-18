const express = require('express');

const respuesta = require('../../web/responses');
const controller = require('./index');

const router = express.Router();

// Rutas
router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/:id', editar);
router.delete('/:id', eliminar);


// Funcionalidades
async function todos(req, res, next) {
    try {
        const items = await controller.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function uno(req, res, next) {
    try {
        const items = await controller.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function agregar(req, res, next) {
    try {
        await controller.agregar(req.body);
        mensaje = 'Item guardado con exito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
};

async function editar(req, res, next) {
    try {
        await controller.editar(req.body);
        mensaje = 'Item actualizado con exito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
};

async function eliminar(req, res, next) {
    const id = req.params.id;
    try {
        await controller.eliminar(id);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
}


module.exports = router;