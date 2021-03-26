/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const router = Router();
const { usuarioRegistro, obtenerUsuarios } = require('../controllers/usuarios');
const verificaToken = require('../middlewares/verifica-token');


router.post('/', usuarioRegistro);
router.get('/', [verificaToken], obtenerUsuarios);


module.exports = router;