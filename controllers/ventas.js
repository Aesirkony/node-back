const { Venta } = require('../models');


const obtenerVentas = async(req, res) =>{

    const query = { estado: true };

    const [ total, ventas ] = await Promise.all([
        Venta.countDocuments(query),
        Venta.find(query)
           
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
    const {codigo_venta, ...body} = req.body;
    let timestamp = +new Date();
    // const ventaDB = await Venta.findOne({codigo_venta: body.codigo_venta});

    // if(ventaDB){
    //     return res.status(400).json({
    //         msg: ` El codigo venta ${ ventaDB.codigo_venta }, ya existe `
    //     });
    // }

    const data = {
        ...body,
        codigo_venta: timestamp
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

    const  venta = await Venta.findByIdAndUpdate(id, data, {new : true});

    res.json( venta );
};

const borrarVenta = async (req, res) => {
    const { id } = req.params;
    const ventaBorrado = await Venta.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( ventaBorrado );
};

const totalVentas =(res) => {
    const total = Venta.find();

    res.json(total);
};

module.exports = {
    actualizarVenta,
    borrarVenta,
    crearVenta,
    obtenerVentas,
    obtenerVenta,
    totalVentas
};
