const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {actualizarCliente,
       borrarCliente,
       crearCliente,
       obtenerCliente,
       obtenerClientePorCedula,
       obtenerClientes } = require('../controllers/clientes');
const { existeClientePorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerClientes);

router.get('/cedula/:cedula', [
    check('cedula', 'agrege la cedula a buscar').not().isEmpty(),
    validarCampos
], obtenerClientePorCedula);


router.get('/:id', [
    check('id', 'No es un id valido!').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos
], obtenerCliente);

router.post('/', [
    check('nombre_cliente','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCliente);


router.put('/:id',[

    check('id').custom( existeClientePorId ),
    validarCampos
], actualizarCliente);

router.delete('/:id',[
    check('id', 'NO es un id válido').isMongoId(),
    check('id').custom( existeClientePorId ),
    validarCampos
], borrarCliente);



module.exports = router;
