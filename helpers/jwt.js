const jwt = require('jsonwebtoken');


const generarToken = (uid) => {
    // Se retorna una promesa para poder utilizar async/await en donde se utilice
    return new Promise((resolve, reject) => {

        // Ingresar la información requerida
        const payload = {
            uid
        };
        // Cambiar el seed
        jwt.sign(payload, 'este-es-el-SEED', {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                console.log(error);
                reject(err);
            } else {
                resolve(token);
            }

        });

    });

}

module.exports = generarToken;