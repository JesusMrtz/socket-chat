var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('nombre'),
    room: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entersChat', user, function(response) {
        console.log(response);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*
socket.emit('createMessage', {
    name: 'Fernando',
    message: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
*/

// Escuchar información
socket.on('createMessage', function(message) {
    console.log('Servidor: ', message);
});

// Escuchar cuando un usuario o sale del chat
socket.on('listPeople', function(people) {
    console.log('People: ', people);
});

// Mensajes privados
socket.on('privateMessage', function(message) {
    console.log('Mensaje privado: ', message);
});