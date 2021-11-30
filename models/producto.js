const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
  codigo_producto: {
      type: Number,
      unique: true
  },
  ivacompra: {
      type: Number,
  },
  nitproveedor: {
      type: Number,
  },
  nombre_producto: {
      type: String
  },
  precio_compra: {
      type: Number,
  },
  precio_venta: {
      type: Number,
  },
});



ProductoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
};


module.exports = model('Producto', ProductoSchema);
