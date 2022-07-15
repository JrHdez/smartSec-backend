

const Usuario = require('../models/usuario');
const Policia = require('../models/policia');
const { db } = require('../models/usuario');

const registerUid = async (req, res = response) => {

    try{

        console.log('register UID FROM',req.body.uidFrom,'TO',req.body.uidTo);

    const uidFrom = req.body.uidFrom;
    const uidTo = req.body.uidTo;

    const usuario = await Usuario.findById(uidFrom);
    const policia = await Policia.findById(uidTo);


    usuario.chatsUid.push(uidTo);
    await usuario.save();
    policia.chatsUid.push(uidFrom); 
    await policia.save();

    return res.status(200).json({
        success: true,
        msg: 'Se han registrado los chats',
        usuario: usuario
    });

    // if (usuario){
    //     console.log("soy user");
    //     usuario.chatsUid = ["Gente de bien","Petro presidente"];
    //     await usuario.save();
    //     return res.status(200).json({
    //         success: true,
    //         msg: "Se ha guardado satisfactoriamente el chat"
    //     });
    // }else if(policia){
    //     console.log("no soy user");
    //     policia.chatsUid = ["policia policia","de noche y de día"];
    //     await policia.save();
    //     return res.status(200).json({
    //         success: true,
    //         msg: "Se ha guardado satisfactoriamente el chat"
    //     });
    // }else{
    //     return res.status(501).json({
    //         success: false,
    //         msg: "Usuario false, policia false, error"
    //     });
    // }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            msg: "Por favor hable con el administrador"
        })
    }

    

    
}

module.exports = {
    registerUid
}