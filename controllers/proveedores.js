const Proveedor = require('../models/proveedores');
const { response } = require('express');
const { existeID } = require('../helpers/existeID');


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


const obtenerProveedorPorID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const proveedorBD = await Proveedor.findById(id);


        if (!proveedorBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }


        res.status(200).json({
            ok: true,
            proveedorBD
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener el proveedor, ver logs'
        });


    }

}


const agregarProveedor = async(req, res = response) => {


    const body = req.body;

    try {
        const nuevoProveedor = new Proveedor(body);

        await nuevoProveedor.save()

        res.status(201).json({
            ok: true,
            msg: 'Proveedor agregado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al agregar proveedor, ver logs'
        });

    }

}

const eliminarProveedor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const proveedorBD = await Proveedor.findById(id);

        if (!proveedorBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }

        const proveedorAsignado = await existeID(id, 'productos');

        if (proveedorAsignado) {
            return res.status(500).json({
                ok: false,
                msg: 'No se puede eliminar al proveedor, está asignado a un producto o más'
            });
        }

        const proveedorEliminado = await Proveedor.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Proveedor eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar proveedor, ver logs'
        });


    }

}


const editarProveedor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const proveedorBD = await Proveedor.findById(id);

        if (!proveedorBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }


        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Proveedor actualizado correctamente',
            proveedorActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al editar el proveedor, ver logs'
        });


    }

}

module.exports = {
    obtenerProveedores,
    agregarProveedor,
    eliminarProveedor,
    obtenerProveedorPorID,
    editarProveedor
}