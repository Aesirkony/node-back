const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const userGet = async(req, res) =>{
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //       .limit(Number(limite)).skip(Number(desde));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))

    ]);
	  res.json({
        total,
        usuarios
        });
};

const userPost = async(req, res) =>{


	const { cedula, nombre, correo, contrasena, rol} = req.body;
	const usuario = new Usuario({cedula, nombre, correo, contrasena, rol});

	//Encriptacion de contraseña
	  const salt = bcryptjs.genSaltSync();
	  usuario.contrasena = bcryptjs.hashSync(contrasena, salt);

	  await usuario.save();
	  res.json({
        msg:'hellow world - controlador',
				usuario	
    });
};

const userPut = async(req, res) =>{
    const { id } = req.params;
    const {_id, cedula, contrasena, correo, ...resto } = req.body;

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
