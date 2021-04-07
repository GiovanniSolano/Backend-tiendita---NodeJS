/*

    Rutas: /api/busqueda/:tabla/:termino

*/

const { Router } = require('express');
const { busquedaPorColeccion } = require('../controllers/busquedas');
const verificaToken = require('../middlewares/verifica-token');
const router = Router();


router.get('/:tabla/:termino', verificaToken, busquedaPorColeccion);



module.exports = router;