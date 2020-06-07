const express = require('express');
const router = express.Router();

router.use(require('./games'));
router.use(require('./votaciones'));
router.use(require('./conteo'));

module.exports = router;