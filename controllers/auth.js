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
        const policiaDB = await Policia.findOne({numeroID});

        if (!usuarioDB && !policiaDB){
            return res.status(400).json({
                success: false,
                msg: 'El DI no se encuentro registrado en nuestras bases de datgos'

            });
        }
        
        if (usuarioDB){
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

        }else{
            //Es policia, se procede a validar contraseña

        const validPassword = bcrypt.compareSync(password, policiaDB.password);

        if (!validPassword){
            return res.status(400).json({
                success: false,
                msg: 'La contraseña no es correcta'
            });
        }
    

        //GENERA JWT
        const token = await generarJWT( policiaDB._id );

        return res.json({
            success: true,
            msg: 'Se ha auntenticado correctamente',
            policia: policiaDB,
            token
        });
        }

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


    if(usuario){
        res.json({
            success: true,
            usuario: usuario,
            token
        });
    }else{
        const policia = await Policia.findById(uid);

        res.json({
            success: true,
            policia: policia,
            token
        });
    }

}

const getUsuarios = async (req, res = response) => {
    
    // const cop =  (req.params.cop === 'true');
    const desde = Number (req.query.desde) || 0;

    // let chatsUid = req.body.chatsUid;
    // chatsUid = chatsUid.replace(/'/g, '"');
    // // console.log('chatsuid',chatsUid);
    // chatsUid = JSON.parse(chatsUid);

    const uid = req.uid;
    let logeado = await Usuario.findById(uid);

    if (logeado == null){
        logeado = await Policia.findById(uid);
        const policias = await Usuario
        .find({ _id: logeado.chatsUid })
        .sort('-online').
        skip(desde)
        .limit(20); 
        console.log('usuariosS',policias);

        return res.status(200).json({
            success: true,
            policias
        });

    }

    const policias = await Policia
        .find({ _id: logeado.chatsUid })
        .sort('-online').
        skip(desde)
        .limit(20); 

    // const usuarios = await Usuario
    //     .find({ _id: { $ne: req.uid} })
    //     .sort('-online').
    //     skip(desde)
    //     .limit(20); //Llamar usuario y ordenarlo por online de manera descendiente;
 
 
     console.log('usuariosS',policias);
    

    return res.status(200).json({
        success: true,
        policias
    });
}


module.exports = {
    creatUsuario,
    login,
    renewToken,
    getUsuarios,
    crearPolicia
}