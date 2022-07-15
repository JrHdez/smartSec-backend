const Alerta = require("./alerta");

class Alertas {

    constructor(){

        this.alertas = [];

    }

    addAlerta ( alerta = new Alerta() ){
        this.alertas.push(alerta);
    }

    getAlertas(){
        return this.alertas;
    }

    deleteAlerta(toDeleteAlert){
        this.alertas = this.alertas.filter( alerta => alerta.usuario.uid !== toDeleteAlert.senderUid );
        console.log('seborraronlasalertas?',this.alertas);
    }



}

module.exports = Alertas;