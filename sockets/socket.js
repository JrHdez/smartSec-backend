const {io} = require('../index')

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const Alertas = require('../models/alertas');
const Alerta = require('../models/alerta');

const alertas = new Alertas();


//Mensajes de sockets
io.on('connection', async (client) => {

    console.log('Cliente connected');
    //verificar autenticacion
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido){return client.disconnect();}
    console.log('Cliente autenticado');

    //Cliente autenticado
    let isCop = await usuarioConectado(uid); //Set status to online
    //Ingresar al usuario a una sala (sockets) en particular
    //Sala global: Todos los dispositivos conectados, client.id, sala individual
    if(isCop){
        // console.log('soycop');
        client.join('cop'); //Ingresas a sala donde recibira las alertas los policias
    }
    
    client.join(uid);

    // client.to(uid).emit('')
    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {

        //TODO: grabar mensajee

        console.log(payload);
        await grabarMensaje(payload);
        io.to( payload.para ).emit('mensaje-personal', payload);
    })


    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado(uid); //Set status to offline
     });

     client.on('alerta', ( payload ) => {
        const alerta = new Alerta(payload.titulo,payload.subtitulo,payload.mensaje,payload.usuario,payload.longitude,payload.latitude,payload.senderUid);
        alertas.addAlerta(alerta);
        console.log('alerta mani',alerta)
        //  io.emit('alerta',payload);
        io.to( 'cop' ).emit('alerta', alertas.getAlertas());

     });

     client.on('delete-alerta', ( payload ) => {
        alertas.deleteAlerta(payload);
        io.to( 'cop' ).emit('alerta', alertas.getAlertas());

     });

    //  io.emit('mensaje',{ admin: 'Mensaje desde el server' });

  });
