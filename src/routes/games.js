const express = require('express');
const router = express.Router();
const Games = require('../models/games');

router.get('/', (req, res) => {
    res.render('games');
});

router.post('/game', async (req, res) => {
    let {
        nombre,
        descripcion,
    } = req.body;
    console.log(req.file.filename);
    try {
        const game = new Games();
        game.nombre = nombre;
        game.descripcion = descripcion;
        game.imagen = req.file.filename;
        game.disponible = true;
        let gameDB = await game.save();
        if (!gameDB) {
            res.status(500).json({
                ok: false,
                message: 'Error Server'
            })
        }
        res.status(200).json({
            ok: true,
            message: 'Game Saved!!'
        });
    } catch (e) {
        res.json({
            ok: false,
            message: 'Error any type'
        })
        console.log('Error triying to insert info in DB', e)
    }
});

// to get all games
router.get('/games', async (req, res) => {
    let gameDB = await Games.find({
        disponible: true
    });
    if (!gameDB) {
        res.status(500).json({
            ok: false,
            message: 'Mensaje'
        });
    }
    res.status(200).json({
        ok: true,
        games: gameDB
    })
});

module.exports = router;