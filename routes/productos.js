const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {actualizarProducto,
       borrarProducto,
       crearProducto,
       obtenerProducto,
       obtenerProductos } = require('../controllers/productos');
const {existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id valido!').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

router.post('/', [
    check('codigo_producto','El codigo es obligatorio').not().isEmpty(),
    validarCampos
], crearProducto);


router.put('/:id',[

    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

router.delete('/:id',[
    check('id', 'NO es un id válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);



module.exports = router;
