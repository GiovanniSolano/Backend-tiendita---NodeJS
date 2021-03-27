/*

    Ruta: /api/auth

*/

const { Router } = require('express');
const router = Router();

const { loginUsuario, renovarToken } = require('../controllers/auth');
const verificaToken = require('../middlewares/verifica-token');


router.post('/', loginUsuario);
router.get('/renuevaToken', [verificaToken], renovarToken);


module.exports = router;