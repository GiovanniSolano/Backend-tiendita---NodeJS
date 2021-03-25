/*

    Ruta: /api/auth

*/

const { Router } = require('express');
const router = Router();

const { loginUsuario } = require('../controllers/auth');


router.post('/', loginUsuario);


module.exports = router;