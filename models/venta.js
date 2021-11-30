const {Schema, model} = require('mongoose');

const VentaSchema = Schema({
  cedula_cliente: {
    type: Schema.Types.ObjectId,
     ref: 'Cliente'
  },
  codigo_venta: {
      type: Number,
  },
  detalle_venta: {
      type: Number,
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
