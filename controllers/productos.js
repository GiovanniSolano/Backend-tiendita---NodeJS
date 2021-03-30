const Producto = require('../models/productos');
const { response } = require('express');


const obtenerProductos = async(req, res = response) => {

    try {

        const productos = await Producto.find({});

        res.status(200).json({
            ok: true,
            productos
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los productos, ver logs'
        });


    }

}


const obtenerProductoID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productoBD = await Producto.findById(id);


        if (!productoBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }


        res.status(200).json({
            ok: true,
            productoBD
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener el producto, ver logs'
        });


    }

}

const agregarProducto = async(req, res = response) => {

    const body = req.body;

    console.log(body);


    try {

        const nuevoProducto = new Producto(body);
        await nuevoProducto.save()


        res.status(201).json({
            ok: true,
            msg: 'Producto agregado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al agregar producto, ver logs'
        });

    }

}

const editarProducto = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productoBD = await Producto.findById(id);

        if (!productoBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado correctamente',
            productoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al editar el producto, ver logs'
        });


    }

}

const eliminarProducto = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productoBD = await Producto.findById(id);

        if (!productoBD) {
            return res.status(500).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        const productoEliminado = await Producto.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar producto, ver logs'
        });


    }

}

module.exports = {
    obtenerProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductoID
}