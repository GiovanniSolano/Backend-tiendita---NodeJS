const Usuario = require('../models/usuarios');
const { response } = require('express');
const bcrypt = require('bcrypt');



const usuarioRegistro = async(req, res = response) => {


    const body = req.body;
    const nuevoUsuario = new Usuario({
        nombre: body.nombre,
        fechaNacimiento: body.fechaNacimiento,
        telefono: body.telefono,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10)
    });

    try {

        const existeUsuario = await Usuario.findOne({ correo: nuevoUsuario.correo });

        if (existeUsuario) {
            return res.status(500).json({

                ok: false,
                msg: 'El correo ya existe'

            });
        }

        await nuevoUsuario.save();

        res.status(200).json({
            ok: true,
            nuevoUsuario
        });



    } catch (error) {
        console.log('error');
        res.status(500).json({

            ok: false,
            msg: 'Error al registrar usuario'

        });


    }


}


module.exports = {
    usuarioRegistro
}