const { Venta } = require('../models');


const obtenerVentas = async(req, res) =>{

    const {limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, ventas ] = await Promise.all([
        Venta.countDocuments(query),
        Venta.find(query)
            .skip(Number(desde)).
            limit(Number(limite))
    ]);

    res.json({
        total,
        ventas
    });
};

const obtenerVenta = async(req, res) => {
    const { id } = req.params;
    const venta = await Venta.findById( id );

    res.json( venta );
}

const crearVenta = async(req, res) => {
    const { ...body} = req.body;

    const ventaDB = await Venta.findOne({codigo_venta: body.codigo_venta});

    if(ventaDB){
        return res.status(400).json({
            msg: ` El codigo venta ${ ventaDB.codigo_venta }, ya existe `
        });
    }

    const data = {
        ...body,
        cedula_cliente: "618df55b6e3ac19ff731a479",
    };

    const venta = new Venta( data );

    await venta.save();

    res.status(201).json(venta);
};

const actualizarVenta = async(req, res) =>{
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
       data.usuario = "618df55b6e3ac19ff731a479";

    const  venta = await Venta.findByIdAndUpdate(id, data, {new : true});

    res.json( venta );
};

const borrarVenta = async (req, res) => {
    const { id } = req.params;
    const ventaBorrado = await Venta.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( ventaBorrado );
};

module.exports = {
    actualizarVenta,
    borrarVenta,
    crearVenta,
    obtenerVentas,
    obtenerVenta
};
