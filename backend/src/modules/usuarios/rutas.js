const express = require('express');

const seguridad = require('./seguridad');
const respuesta = require('../../web/responses');
const controller = require('./index');

const router = express.Router();

// Rutas
router.get('/', todos);
router.get('/:id', uno);
router.post('/', seguridad(), agregar);
router.put('/', seguridad(), eliminar);

// Funcionalidades
async function todos (req, res, next){
    try{
        const items = await controller.todos();
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function uno (req, res, next){
    try{
        const items = await controller.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function agregar (req, res, next){
    try{
        const items = await controller.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Item guardado con exito';
        }else{
            mensaje = 'Item actualizado con exito';
        }
        respuesta.success(req, res, mensaje, 201);
    }catch(err){
        next(err);
    }
};

async function eliminar (req, res, next){
    try{
        const items = await controller.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;