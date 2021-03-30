/**
 * Ruta: /api/productos
 */


const { Router } = require('express');
const router = Router();
const { obtenerProductos, agregarProducto, editarProducto, eliminarProducto, obtenerProductoID } = require('../controllers/productos');
const verificaToken = require('../middlewares/verifica-token');


router.get('/', verificaToken, obtenerProductos);
router.get('/:id', verificaToken, obtenerProductoID);
router.post('/', verificaToken, agregarProducto);
router.put('/:id', verificaToken, editarProducto);
router.delete('/:id', verificaToken, eliminarProducto);



module.exports = router;