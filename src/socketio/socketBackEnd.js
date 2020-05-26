const {
    io
} = require('../index');

io.on('connection', (client) => {
    console.log('Se conecto un cliente');
});