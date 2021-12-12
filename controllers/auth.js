const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res) => {
    
    const {usuario, contrasena } = req.body;


    try{

        const user = await Usuario.findOne({usuario});

        if( usuario === undefined){
            return res.status(400).json({
                msg: 'Error login - estado',
            });
        }

        const validPassword = bcryptjs.compareSync(contrasena, user.contrasena);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Error login - contraseña',
            });
        }

        const token = await generarJWT(user.id);

        res.json({
            user,
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
