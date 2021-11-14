const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {actualizarProducto,
       borrarProducto,
       crearProducto,
       obtenerProducto,
       obtenerProductos } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id valido!').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
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
