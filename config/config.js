const mongoose = require('mongoose');

const dbConnection = async() => {

    try{
        
        mongoose.connect( process.env.DB_CNN,{
            autoIndex: true
        });
        console.log('DB Online');

    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos')
    }
}

module.exports = {
    dbConnection
}