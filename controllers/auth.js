const { generarJWT } = require("../helpers/jwt");

const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");

const creatUsuario = async (req,res = response) => {

    const { numeroID, password } = req.body;

    try{

        const existeNumeroID = await Usuario.findOne({numeroID});

        if (existeNumeroID){
            return res.status(400).json({
                success: false,
                msg: 'El usuario ya está registrado en el sistema'
            });
        }

        const usuario = new Usuario( req.body )
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
    
        //GENERA JWT

        const token = await generarJWT(usuario._id);

        

        res.json({
            success: true,
            msg: usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Por favor hable con el administrador"
        })
    }


}

const login = async (req,res = response) => {

    const { numeroID, password } = req.body;

    try{

        const usuarioDB = await Usuario.findOne({numeroID});

        if (!usuarioDB){
            return res.status(400).json({
                success: false,
                msg: 'El usuario no está registrado en el sistema'
            });
        }

        //Validar password

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(400).json({
                success: false,
                msg: 'La contraseña no es correcta'
            });
        }
    

        //GENERA JWT
        const token = await generarJWT( usuarioDB._id );

        res.json({
            success: true,
            usuario: usuarioDB,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Por favor hable con el administrador"
        })
    }

}

const renewToken = async(req,res = response) => {

    const uid = req.uid;

    //generar nuevo JWT
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        success: true,
        usuario: usuario,
        token
    });
}


module.exports = {
    creatUsuario,
    login,
    renewToken
}