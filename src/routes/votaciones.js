const express = require('express');
const router = express.Router();

router.get('/votaciones', (req, res) => {
    res.render('votaciones');
});

module.exports = router;