const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { userGet, userPut, userPost, userPatch, userDelete } = require('../controllers/user');
const router = Router();


router.get('/', userGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom(esRoleValido),
    validarCampos
],
           userPut);
router.post('/', [
    check('cedula', 'La cedula no es valida').not().isEmpty(),
	  check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    validarCampos
],userPost);

router.patch('/', userPatch);
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,userDelete);

module.exports = router;

