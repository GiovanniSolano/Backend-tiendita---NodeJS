const Usuario = require('../models/usuarios');
const { response } = require('express');
const bcrypt = require('bcrypt');


const loginUsuario = async(req, res = response) => {



    const { correo, password } = req.body;

    try {

        const usuarioBD = await Usuario.findOne({ correo });

        // Cambiar mensaje al pasar a producción, sólo es para probar funcionamiento
        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectas - email'
            });
        }

        // Verificar contraseña 
        const validPassword = await bcrypt.compareSync(password, usuarioBD.password);

        // Cambiar mensaje al pasar a producción, sólo es para probar funcionamiento
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectas - password'
            });
        }

        // Generar token

        res.status(200).json({
            ok: true,
            msg: 'Login exitoso'
        });




    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión, ver logs'
        });


    }


}

module.exports = {
    loginUsuario,

}