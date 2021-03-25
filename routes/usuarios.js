/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const router = Router();
const { usuarioRegistro } = require('../controllers/usuarios');


router.post('/', usuarioRegistro);


module.exports = router;