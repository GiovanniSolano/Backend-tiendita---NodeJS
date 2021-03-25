/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const router = Router();
const { usuarioRegistro, obtenerUsuarios } = require('../controllers/usuarios');


router.post('/', usuarioRegistro);
router.get('/', obtenerUsuarios);


module.exports = router;