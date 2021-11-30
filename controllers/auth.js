const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res) => {
    
    const {nombre, contrasena } = req.body;


    try{

        const usuario = await Usuario.findOne({nombre});
        console.log(typeof usuario);
        if( nombre === undefined){
            return res.status(400).json({
                msg: 'Error login - estado',
            });
        }

        const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Error login - contraseña',
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            nombre,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'error interno',
            error
        });
    }


};


module.exports = {
    login
};
