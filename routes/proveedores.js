/**
 * Ruta: /api/proveedores
 */

const { Router } = require('express');
const router = Router();

const { obtenerProveedores } = require('../controllers/proveedores');

router.get('/', obtenerProveedores);



module.exports = router;