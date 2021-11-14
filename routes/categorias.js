const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {actualizarCategoria,
       borrarCategoria,
       crearCategorias,
       obtenerCategorias,
       obtenerCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id valido!').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategorias);


router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);

router.delete('/:id',[
    check('id', 'NO es un id válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);



module.exports = router;
