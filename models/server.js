const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
	constructor(){
		this.app = express();
		this.port = process.env.PORT;

      this.paths = {
          auth: '/api/auth',
          usuarios: '/api/usuarios',
          productos: '/api/productos',
					clientes: '/api/clientes',
          ventas: '/api/ventas'
      };


		this.conectarDB();
		//middlewares
		this.middlewares();


		  this.routes();
	}

	async conectarDB(){
		await dbConnection();
	}
	  routes(){
      this.app.use(this.paths.auth, require('../routes/auth'));
      this.app.use(this.paths.usuarios, require('../routes/user'));
      this.app.use(this.paths.productos, require('../routes/productos'));
			this.app.use(this.paths.clientes, require('../routes/clientes'));
      this.app.use(this.paths.ventas, require('../routes/ventas'));


	}
	middlewares(){
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(express.static('public'));
	}

	listen(){
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en el puerto: ', this.port);
		});
	}
}

module.exports = Server;
