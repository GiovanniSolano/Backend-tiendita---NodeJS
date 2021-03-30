const { Schema, model } = require('mongoose');


const direccionSchema = Schema({


    calle: {
        type: String,
        required: true
    },

    ciudad: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true
    },

    codigo_postal: {
        type: Number,
        required: true
    }


});

module.exports = model('Direccion', direccionSchema);