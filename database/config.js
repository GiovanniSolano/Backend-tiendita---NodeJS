const mongoose = require('mongoose');



const connectionDB = async() => {

    try {
        await mongoose.connect('mongodb://localhost/tiendita', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, () => {
            console.log('Base de datos inicializada');

        });
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD, ver logs');
    }

}

module.exports = connectionDB;