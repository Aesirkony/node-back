const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;
