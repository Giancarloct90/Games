const express = require('express');
const router = express.Router();

router.use(require('./games'));

module.exports = router;