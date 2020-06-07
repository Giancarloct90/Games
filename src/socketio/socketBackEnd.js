const {
    io
} = require('../index');

// INIT CONNECTION
io.on('connection', (client) => {
    console.log('Se conecto un cliente');

    // WHEN SOMEONE VOTED
    client.on('voted', (e) => {
        client.broadcast.emit('voted', 'server says: voted');
        console.log(e);
    });
});