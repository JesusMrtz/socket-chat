const { io } = require('../server');
const { Usuario } = require('../classes/usuario');
const { createMessage } = require('../utils/utils');


const user = new Usuario();

io.on('connection', (client) => {
    client.on('entersChat', (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'El nombre y/o sala son necesarios'
            });
        }

        client.join(data.room);

        user.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPeople', user.getPeopleByRoom(data.room));
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.name} se unió`));
        callback(user.getPeopleByRoom(data.room));
    });

    client.on('createMessage', (data, callback) => {
        let person = user.getPerson(client.id);
        let message = createMessage(person.name, data.message);

        client.broadcast.to(person.room).emit('createMessage', message);
        callback(message);
    });

    client.on('disconnect', () => {
        let deletedPerson = user.deletePerson(client.id);

        client.broadcast.to(deletedPerson.room).emit('createMessage', createMessage('Admin', `${deletedPerson.name} salió`));
        client.broadcast.to(deletedPerson.room).emit('listPeople', user.getPeopleByRoom(deletedPerson.room));
    });

    // Mnesajes privados
    client.on('privateMessage', (data) => {
        let person = user.getPerson(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message));
    });
});