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

// TO UPDATE A GAME
router.post('/updateGame', async (req, res) => {
    let id = req.query.id;
    console.log(req.body);
    console.log(id);
    try {
        let gameDB = await Games.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!gameDB) {
            res.status(500).json({
                ok: false,
                message: 'Server Error'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Games Updated',
            gameDB
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Error'
        });
        console.log('Error trying updated a game');
    }

});

// to delete a game
router.post('/deleteGame', async (req, res) => {
    let {
        id
    } = req.body;
    try {
        let deleteGameDB = await Games.findByIdAndUpdate(id, {
            disponible: false
        }, {
            new: true
        });
        if (!deleteGameDB) {
            res.status(500).json({
                ok: false,
                message: 'Server Error'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Games deleted',
            deleteGameDB
        });
    } catch (e) {
        console.log('Error traying to delete games');
    }
});

module.exports = router;