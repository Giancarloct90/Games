const express = require('express');
const router = express.Router();

router.get('/conteo', (req, res) => {
    res.render('conteo');
});

module.exports = router;