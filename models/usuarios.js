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


// En todas las peticiones que se hagan a esta colección, no se mostrará el password ni el _v,
// el _id se renombra a uid

usuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', usuarioSchema);