const Producto = require('../models/productos');
const { response } = require('express');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dpg6wpd2r',
    api_key: '236433162332533',
    api_secret: 'kk_dwWGGQJUocQ_vBM34wYyaK3U'
});



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
                msg: 'No existe un producto con ese id'
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

    try {


        // Existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningún archivo seleccionado'
            });
        }

        const file = req.files.imagen;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "productos"
        });

        // console.log(result);
        const nuevoProducto = new Producto({
            nombre: body.nombre,
            marca: body.marca,
            descripcion: body.descripcion,
            precio: body.precio,
            proveedor: body.proveedor,
            cantidad: body.cantidad,
            img_id: result.public_id,
            url_img: result.url
        });

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



        if (req.files) {


            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay ningún archivo seleccionado'
                });
            }

            await cloudinary.uploader.destroy(productoBD.img_id);


            const file = req.files.imagen;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "productos"
            });


            req.body.img_id = result.public_id;
            req.body.url_img = result.url;



        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado correctamente',
            productoActualizado
        });

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
        await cloudinary.uploader.destroy(productoBD.img_id);


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