const { response } = require('express');
const Producto = require('../models/productos');


const busquedaPorColeccion = async(req, res = response) => {


    const termino = req.params.termino;
    const tabla = req.params.tabla;
    const regex = new RegExp(termino, 'i');
    let data = [];

    switch (tabla) {
        case 'productos':

            data = await Producto.find({ nombre: regex });

            break;

        default:

            return res.status(400).json({
                ok: false,
                msg: 'No existe esa colección'
            });
    }


    res.status(200).json({
        ok: true,
        resultados: data
    });

}



module.exports = {
    busquedaPorColeccion
}