const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {actualizarVenta,
       borrarVenta,
       crearVenta,
       obtenerVenta,
       obtenerVentas } = require('../controllers/productos');
const { existeVentaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerVentas);

router.get('/:id', [
    check('id', 'No es un id valido!').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos
], obtenerVenta);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id valido').isMongoId(),
    validarCampos
], crearVenta);


router.put('/:id',[

    check('id').custom( existeVentaPorId ),
    validarCampos
], actualizarVenta);

router.delete('/:id',[
    check('id', 'NO es un id válido').isMongoId(),
    check('id').custom( existeVentaPorId ),
    validarCampos
], borrarVenta);



module.exports = router;
