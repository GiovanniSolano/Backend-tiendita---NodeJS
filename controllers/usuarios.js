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

        // const existeUsuarioCorreo = await Usuario.findOne({ correo: nuevoUsuario.correo });
        // const existeUsuarioTel = await Usuario.findOne({ telefono: nuevoUsuario.telefono });

        // PromiseAll para ejecutar las dos promesas anteriores simultaneamente

        const [existeUsuarioCorreo, existeUsuarioTel] = await Promise.all([
            Usuario.findOne({ correo: nuevoUsuario.correo }),
            Usuario.findOne({ telefono: nuevoUsuario.telefono })
        ]);


        if (existeUsuarioCorreo) {
            return res.status(500).json({

                ok: false,
                msg: 'El correo ya existe'

            });
        }

        if (existeUsuarioTel) {
            return res.status(500).json({

                ok: false,
                msg: 'El teléfono ya existe'

            });
        }

        await nuevoUsuario.save();

        res.status(200).json({
            ok: true,
            nuevoUsuario
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario'
        });
    }
}


const obtenerUsuarios = async(req, res = response) => {


    try {

        // const usuariosBD = await Usuario.find({});
        // const usuariosTotal = await Usuario.count();

        // PromiseAll para ejecutar las dos promesas anteriores simultaneamente

        const [usuariosBD, usuariosTotal] = await Promise.all([

            Usuario.find({}),
            Usuario.countDocuments()

        ]);

        res.status(200).json({
            ok: true,
            totalUsuarios: usuariosTotal,
            usuariosBD
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios'
        });


    }


}


module.exports = {
    usuarioRegistro,
    obtenerUsuarios
}