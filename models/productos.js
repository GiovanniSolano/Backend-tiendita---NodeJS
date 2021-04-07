const { Schema, model } = require('mongoose');


const productoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    marca: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    },

    img_id: {
        type: String
    },

    url_img: {
        type: String
    },

    proveedor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Proveedor'
    },

});

module.exports = model('Producto', productoSchema);