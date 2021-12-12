const {Schema, model} = require('mongoose');

const VentaSchema = Schema({
  cedula_cliente: {
    type: Number,
     ref: 'Cliente'
  },
  codigo_venta: {
      type: Number,
  },
  detalle_venta: {
      cantidad_producto: Number,
      codigo_producto: Number,
      valor_total: Number,
      valor_venta: Number,
      valorIva: Number
  },
  ivaventa: {
      type: String
  },
  total_venta: {
      type: Number,
  },
  valor_venta: {
      type: Number,
  },
});



VentaSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
};


module.exports = model('Venta', VentaSchema);
