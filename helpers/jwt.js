const jwt = require('jsonwebtoken');

const generarJWT = ( uid) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, (err, token) => {
            if (err){
                reject('Error creando el JSON WEB TOKEN');
            }else{
                resolve(token);
            }
        });

    } )

}

const comprobarJWT = ( token = '' ) => {

    try{

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
        


   
    }catch(err){
        return [false,null]
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}