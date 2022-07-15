const { v4: uuidV4 } = require('uuid');

class Alerta {

    constructor( titulo = 'Alerta', subtitulo, mensaje, usuario, longitude, latitude, senderUid ){
        
        // this.id = uuidV4(); ///Identificador unico
        this.titulo = titulo;
        this.subtitulo = subtitulo;
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.longitude = longitude;
        this.latitude = latitude;
        this.senderUid = senderUid;
    }

}

module.exports = Alerta;