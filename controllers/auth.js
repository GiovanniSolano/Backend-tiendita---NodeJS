const Usuario = require('../models/usuarios');
const { response } = require('express');


const loginUsuario = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Login working'
    });

}

module.exports = {
    loginUsuario,

}