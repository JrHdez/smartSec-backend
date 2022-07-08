const {io} = require('../index')

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');

//Mensajes de sockets
io.on('connection',  client => {

    console.log('Cliente connected');
    //verificar autenticacion
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido){return client.disconnect();}
    console.log('Cliente autenticado');

    //Cliente autenticado
    usuarioConectado(uid); //Set status to online

    //Ingresar al usuario a una sala (sockets) en particular
    //Sala global: Todos los dispositivos conectados, client.id, sala individual

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
         console.log('Alerta    !!',payload);
         io.emit('alerta',payload);
     });

    //  io.emit('mensaje',{ admin: 'Mensaje desde el server' });

  });
