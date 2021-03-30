const Proveedor = require('../models/proveedores');
const { response } = require('express');


const obtenerProveedores = async(req, res = response) => {

    try {

        const proveedores = await Proveedor.find({});


        res.status(200).json({
            ok: true,
            proveedores
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los proveedores, ver logs'
        });


    }

}

module.exports = {
    obtenerProveedores
}