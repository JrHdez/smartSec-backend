const Alerta = require("./alerta");

class Alertas {

    constructor(){

        this.alertas = [];

    }

    addAlerta ( alerta = new Alerta() ){
        this.alertas.push(alerta);
        console.log('LAS ALERTAS SERVER',this.alertas);
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