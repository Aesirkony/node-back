const Role = require('../models/role');
const {Usuario, Producto, Venta, Cliente }= require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
};

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
	  if( existeEmail ){
        throw new Error(`El correo ${ correo } ya existe`);
		}
};

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
	  if( !existeUsuario ){
        throw new Error(`El usuario con id ${ id } no existe`);
		}
};

const existeClientePorId = async(id) => {
    const existeCliente = await Cliente.findById(id);
	  if( !existeCliente ){
        throw new Error(`El Cliente con id ${ id } no existe`);
		}
};



const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
	  if( !existeProducto ){
        throw new Error(`El producto con id ${ id } no existe`);
		}
};

const existeVentaPorId = async(id) => {
    const existeVenta = await Venta.findById(id);
	  if( !existeVenta ){
        throw new Error(`La venta con id ${ id } no existe`);
		}
};



module.exports = {
    esRoleValido,
    emailExiste,
    existeClientePorId,
    existeUsuarioPorId,
    existeProductoPorId,
    existeVentaPorId
};
