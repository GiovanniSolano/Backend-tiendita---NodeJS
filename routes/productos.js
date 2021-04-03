/**
 * Ruta: /api/productos
 */


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { obtenerProductos, agregarProducto, editarProducto, eliminarProducto, obtenerProductoID } = require('../controllers/productos');
const { validarCampos } = require('../middlewares/validar-campos');
const verificaToken = require('../middlewares/verifica-token');


router.get('/', verificaToken, obtenerProductos);

router.get('/:id', [
    verificaToken,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], obtenerProductoID);

router.post('/', [
    verificaToken,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('marca', 'La marca es requerida').not().isEmpty(),
    check('descripcion', 'La descripción es necesaria').not().isEmpty(),
    check('precio', 'El precio es requerido').not().isEmpty(),
    check('cantidad', 'La cantidad es requerida').not().isEmpty(),
    check('proveedor', 'El proveedor es requerido').not().isEmpty(),
    validarCampos
], agregarProducto);


router.put('/:id', [
    verificaToken,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('marca', 'La marca es requerida').not().isEmpty(),
    check('descripcion', 'La descripción es necesaria').not().isEmpty(),
    check('precio', 'El precio es requerido').not().isEmpty(),
    check('cantidad', 'La cantidad es requerida').not().isEmpty(),
    check('proveedor', 'El proveedor es requerido').not().isEmpty(),
    check('id', 'El id del producto no es válido').isMongoId(),
    validarCampos
], editarProducto);
router.delete('/:id', [
    verificaToken,
], eliminarProducto);



module.exports = router;