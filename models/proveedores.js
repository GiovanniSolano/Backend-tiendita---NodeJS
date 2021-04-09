const { Schema, model } = require('mongoose');

const proveedorSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },

    telefono: {
        type: String,
        required: true
    },

    // direccion: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Direccion'
    // },


}, { collection: 'proveedores' });


module.exports = model('Proveedor', proveedorSchema);