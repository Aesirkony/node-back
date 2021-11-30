const { Cliente } = require('../models');


const obtenerClientes = async(req, res) =>{

    const {limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, clientes ] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
            .skip(Number(desde)).
            limit(Number(limite))
    ]);

    res.json({
        total,
        clientes
    });
};

const obtenerCliente = async(req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById( id );

    res.json( cliente );
}

const crearCliente = async(req, res) => {
    const {estado, usuario, ...body} = req.body;

    const clienteDB = await Cliente.findOne({nombre_cliente: body.nombre_cliente});

    if(clienteDB){
        return res.status(400).json({
            msg: ` El cliente ${ clienteDB.nombre_cliente }, ya existe `
        });
    }

    const data = {
        ...body,
        nombre: body.nombre_cliente.toUpperCase(),
        usuario: "618df55b6e3ac19ff731a479",
    };

    const cliente = new Cliente( data );

    await cliente.save();

    res.status(201).json(cliente);
};

const actualizarCliente = async(req, res) =>{
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
       data.usuario = "618df55b6e3ac19ff731a479";

    const  cliente = await Cliente.findByIdAndUpdate(id, data, {new : true});

    res.json( cliente );
};

const borrarCliente = async (req, res) => {
    const { id } = req.params;
    const clienteBorrado = await Cliente.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( clienteBorrado );
};

module.exports = {
    actualizarCliente,
    borrarCliente,
    crearCliente,
    obtenerClientes,
    obtenerCliente
};
