const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');
const Policia = require('../models/policia');

const usuarioConectado = async (uid = '') => {

    // console.log('conectadin',uid);

    const usuario = await Usuario.findById(uid);
    const policia = await Policia.findById(uid);
    if (usuario){
        usuario.online = true;
        await usuario.save();
        return false; //No es policia
    }else{
        policia.online = true;
        await policia.save();
        return true; //Es policia
    }

   

    // return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);
    const policia = await Policia.findById(uid);

    if (usuario){
      usuario.online = false;
      await usuario.save();
    }else{
       policia.online = false;
       await policia.save();
    }


    return usuario;
}

const grabarMensaje = async ( payload ) => {

    /*
        {
            de: '',
            para: '',
            texto: ''
        }
    */


    try{
        const mensaje = new Mensaje( payload )
        await mensaje.save();

        return true;
    }catch(error){

        return false;
    }

}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}