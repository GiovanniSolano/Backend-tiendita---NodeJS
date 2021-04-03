/*

    Ruta: /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const verificaToken = require('../middlewares/verifica-token');


router.post('/', [
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos

], loginUsuario);



router.get('/renuevaToken', [verificaToken], renovarToken);


module.exports = router;