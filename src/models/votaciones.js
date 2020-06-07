const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let votos = new Schema({
    game_id: {
        type: String,
        required: [true, 'El id del juego es necesario']
    },
    count: {
        type: Number,
        required: [true, 'El count es necesarioa']
    }
});

module.exports = mongoose.model('Votos', votos);