const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	cedula:{
		type: String,
		required: [true, "La cedula es obligatoria"],
		unique: true
	},
	nombre:{
		type: String,
		required: [true, 'El nombre es obligatorio']
	},
	correo:{
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true
	},
	contrasena: {
		type: String,
		required: [true, 'La contraseña es obligatoria']
	},
	img: {
		type: String
	},    
	rol: {
		type: String,
		required: true,
	},
	estado: {
		type: Boolean,
		default: true
	}
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, contrasena, ...usuario} = this.toObject();
    return usuario;
};


module.exports = model('Usuario', UsuarioSchema);
