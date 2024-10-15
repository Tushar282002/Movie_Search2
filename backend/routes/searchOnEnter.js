const express = require('express');
const router = express.Router();
const searchOnEnter = require('../controllers/searchOnEnter');

router.get('/', searchOnEnter);

module.exports = router;
