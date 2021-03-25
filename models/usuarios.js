const { Schema, model } = require('mongoose');



const usuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    fechaNacimiento: {
        type: Date,
        required: true
    },

    role: {

        type: String,
        default: 'USER'

    },

    telefono: {
        type: String,
        required: true,
        unique: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', usuarioSchema);