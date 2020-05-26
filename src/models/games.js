const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let games = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    disponible: {
        type: Boolean
    }
});

module.exports = mongoose.model('Games', games);