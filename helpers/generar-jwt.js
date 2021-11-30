const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) =>{

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '365d'
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject('no se pudo general el token');
            }else {
                resolve(token);
            }
        } );

    });
};



module.exports = {
    generarJWT
    
};
