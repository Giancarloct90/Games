const express = require('express');
const router = express.Router();
const Votos = require('../models/votaciones');

// FIRT VIEW
router.get('/votaciones', (req, res) => {
    res.render('votaciones');
});

// MAKE A VOTE
router.post('/vote', async (req, res) => {
    let id = req.query.id;
    let vote = req.body.votos;
    try {
        let gameVoted = await Votos.findOneAndUpdate({
            game_id: id
        }, {
            count: vote
        }, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });
        if (!gameVoted) {
            res.status(500).json({
                ok: false,
                message: 'Error'
            })
        }
        res.status(200).json({
            ok: true,
            message: 'Voted!!',
            gameVoted
        });
    } catch (e) {
        res.json({
            ok: false,
            message: 'erro',
            e
        })
        console.log('Error Trying to update vote tables');
    }
});

// TO GET VOTES FOR GAMES
router.get('/gameVotes', async (req, res) => {
    let id = req.query.id;
    try {
        let gameVotes = await Votos.findOne({
            game_id: id
        });
        if (gameVotes) {
            res.status(200).json({
                ok: true,
                message: 'El juego existe',
                gameVotes
            });
        } else {
            res.status(300).json({
                ok: false,
                message: 'El juego no existe'
            });
        }
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: 'Error Server'
        });
        console.log('Error trying to get votes for games');
    }
});

module.exports = router;