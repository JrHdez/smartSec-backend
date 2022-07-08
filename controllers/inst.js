//Ejemplo llamar usuario

const Usuario = require('../models/usuario');
const Policia = require('../models/policia');

const getCops = async (req, res = response) => {

    const desde = Number (req.query.desde) || 0;

    const policias = await Policia
        .find().sort('-online').
        skip(desde)
        .limit(20); //Llamar usuario y ordenarlo por online de manera descendiente;


    return res.status(200).json({
        success: true,
        policias
    });
}

module.exports = {
    getCops
}