const jwt = require('jsonwebtoken');
const { response } = require('express');

const verificaToken = (req, res = response, next) => {

    const token = req.body.token;

    jwt.verify(token, 'este-es-el-SEED', function(err, decoded) {

        if (err) {
            return res.status(401).json({

                ok: false,
                msg: 'Token incorrecto'

            });
        }

        req.uid = decoded.uid;

        next();

    });

}

module.exports = verificaToken;