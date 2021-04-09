/**
 * Ruta: /api/proveedores
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { obtenerProveedores, agregarProveedor, eliminarProveedor, obtenerProveedorPorID, editarProveedor } = require('../controllers/proveedores');
const verificaToken = require('../middlewares/verifica-token');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', obtenerProveedores);
router.get('/:id', [
    verificaToken,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], obtenerProveedorPorID);
router.post('/', [
    verificaToken,
    check('nombre', 'El nombre del proveedor es requerido').not().isEmpty(),
    check('telefono', 'El teléfono del proveedor es requerido').not().isEmpty(),
    // check('direccion', 'La dirección del proveedor es requerida').not().isEmpty(),
    // check('direccion', 'El id de la dirección no es válido').isMongoId(),
    validarCampos
], agregarProveedor);
router.put('/:id', [
    verificaToken,
    check('id', 'El id no es válido').isMongoId(),
    check('nombre', 'El nombre del proveedor es requerido').not().isEmpty(),
    check('telefono', 'El teléfono del proveedor es requerido').not().isEmpty(),
    validarCampos
], editarProveedor);

router.delete('/:id', [
        verificaToken,
        check('id', 'El id no es válido').isMongoId(),
        validarCampos
    ],
    eliminarProveedor)



module.exports = router;