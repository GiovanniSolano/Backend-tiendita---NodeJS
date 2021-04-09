const Producto = require('../models/productos');


const existeID = async(id, coleccion) => {

    return new Promise((resolve, reject) => {


        switch (coleccion) {
            case 'productos':

                Producto.findOne({ proveedor: id })
                    .then(producto => {

                        if (producto) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }

                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });

                break;

            default:
                break;

        }
    });



}

module.exports = {

    existeID

}