const express = require('express');
const connectionDB = require('./database/config');
const app = express();
const cors = require('cors');


// CORS
app.use(cors());



// Express bodyParser
app.use(express.json());


// Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));




// Inicializar la BD
connectionDB();



// Inicialización de server 

app.listen(3000, () => {

    console.log('Server inicializado en el puerto 3000');


});