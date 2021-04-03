/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { usuarioRegistro, obtenerUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const verificaToken = require('../middlewares/verifica-token');


router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es requerida').not().isEmpty(),
    check('telefono', 'El teléfono es requerido').not().isEmpty(),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos
], usuarioRegistro);



router.get('/', [
    verificaToken,
], obtenerUsuarios);


module.exports = router;