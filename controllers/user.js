const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = async(req, res) =>{
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //       .limit(Number(limite)).skip(Number(desde));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)

    ]);
	  res.json({
        total,
        usuarios
        });
};

const userPost = async(req, res) =>{


	  const { cedula, nombre, correo, contrasena, usuario, rol} = req.body;
	  const usuarioData = new Usuario({cedula, nombre, correo,contrasena, usuario, rol});
    console.log(req.body);
	//Encriptacion de contraseña
	    const salt = await bcryptjs.genSaltSync();
	    usuarioData.contrasena = await bcryptjs.hashSync(contrasena, salt);

	   await usuarioData.save();
	  res.json({
				usuarioData,	
    });
};

const userPut = async(req, res) =>{
    const { id } = req.params;
    const {_id, cedula, contrasena, ...resto } = req.body;

    // validar contra bd
    if( contrasena ){
        //Encriptacion de contraseña
	      const salt = bcryptjs.genSaltSync();
	      resto.contrasena = bcryptjs.hashSync(contrasena, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
	res.json({
      usuario
  });
};

const userPatch = (req, res) =>{
	res.json({
                msg:'hellow world - controlador'
        });
};

const userDelete = async(req, res) =>{
    const { id } = req.params;
    //borrado fisicamente
    //const usuario = await  Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


	res.json(usuario);
};

module.exports = {
	userGet,
	userPost,
	userPut,
	userPatch,
	userDelete
};
