const {Schema, model} = require('mongoose');

const ClienteSchema = Schema({
  cedula_cliente: {
      type: Number,
      unique: true
  },
  direccion_cliente: {
      type: String,
  },
  email_cliente: {
      type: String,
  },
  nombre_cliente: {
      type: String,
  },
  telefono_cliente: {
      type: String,
  },
  estado:{
       type: Boolean,
       default: true,
       required: true
   },

});
ClienteSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject();
    return data;
};


module.exports = model('Cliente', ClienteSchema);
