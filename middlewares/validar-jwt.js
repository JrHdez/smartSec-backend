const { json } = require('express/lib/response');
const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) => {

    const token = req.header('x-token');


    if (!token){
        return res.status(401).json({
            success: false,
            msg: 'No se encontro un token'
        });
    }

    try{

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            msg: 'Token inválido'
        });
    }


}

module.exports = {
    validarJWT
}