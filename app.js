const express = require('express');
const connectionDB = require('./database/config');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload');


// Fileupload
app.use(fileupload({
    useTempFiles: true
}));



// CORS
app.use(cors());



// Express bodyParser
app.use(express.json());


// Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/busqueda', require('./routes/busquedas'));
app.use('/api/proveedores', require('./routes/proveedores'));




// Inicializar la BD
connectionDB();



// Inicialización de server 

app.listen(3000, () => {

    console.log('Server inicializado en el puerto 3000');


});