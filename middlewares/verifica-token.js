const jwt = require('jsonwebtoken');
const { response } = require('express');

const verificaToken = (req, res = response, next) => {

    const token = req.headers['x-token'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe un token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, 'este-es-el-SEED');
        req.uid = uid;

        next();

    } catch (error) {

        return res.status(401).json({

            ok: false,
            msg: 'Token no válido'

        });


    }

}

module.exports = verificaToken;