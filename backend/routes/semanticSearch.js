const express = require('express');
const router = express.Router();
const semantic = require('../controllers/semanticSearch');

router.get('/', semantic);

module.exports = router;
