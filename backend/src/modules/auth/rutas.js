const express = require('express');

const respuesta = require('../../web/responses');
const controller = require('./index');

const router = express.Router();

router.get('/login', login);

async function login (req, res, next){
    try{
        const token = await controller.login(req.body.usuario, req.body.password);
        respuesta.success(req, res, token, 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;