const { generarJWT } = require("../helpers/jwt");

const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario");
const Policia = require("../models/policia");

const creatUsuario = async (req,res = response) => {

    const { numeroID, password, email } = req.body;

    try{

        const existeNumeroID = await Usuario.findOne({numeroID});
        const existeEmail = await Usuario.findOne({email});
        if (existeNumeroID){
            return res.status(400).json({
                success: false,
                msg: 'El usuario ya está registrado en el sistemaaa'
            });
        }
        if (existeEmail){
            return res.status(400).json({
                success: false,
                msg: 'El usuario (email) ya está registrado en el sistemaaa'
            });
        }

        const usuario = new Usuario( req.body );
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
    
     //   GENERA JWT

        const token = await generarJWT(usuario._id);

        

        res.json({
            success: true,
            usuario,
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

const crearPolicia = async (req,res = response) => {

    const { numeroID, password } = req.body;
    console.log('resbnoy',req.body);
    try{

        const existeNumeroID = await Usuario.findOne({numeroID});

        if (existeNumeroID){
            return res.status(400).json({
                success: false,
                msg: 'El usuario ya está registrado en el sistema'
            });
        }

        //TODO Verificar que sea policia

        const policia = new Policia( req.body );
    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        policia.password = bcrypt.hashSync( password, salt );

        await policia.save();
    
        //GENERA JWT

        const token = await generarJWT(policia._id);

        

        res.json({
            success: true,
            policia,
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

        return res.json({
            success: true,
            msg: 'Se ha auntenticado correctamente',
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
    console.log("jasd",usuario);

    if(usuario){
        res.json({
            success: true,
            usuario: usuario,
            token
        });
    }else{
        const policia = await Policia.findById(uid);
        console.log("jasd",policia);
        res.json({
            success: true,
            policia: policia,
            token
        });
    }

}

const getUsuarios = async (req, res = response) => {

    const desde = Number (req.query.desde) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid} })
        .sort('-online').
        skip(desde)
        .limit(20); //Llamar usuario y ordenarlo por online de manera descendiente;
    
 
    return res.status(200).json({
        success: true,
        usuarios
    });
}


module.exports = {
    creatUsuario,
    login,
    renewToken,
    getUsuarios,
    crearPolicia
}