const {io} = require('../index')

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente coenctado');
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

    //  client.on('Mensaje', ( payload ) => {
    //      console.log('Mensaje!!',payload);
    //  });

    //  io.emit('mensaje',{ admin: 'Mensaje desde el server' });

  });
