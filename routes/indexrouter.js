const express = require('express');
const router = express.Router();

const {index} = require('../controllers/index.js')

router.get('/',index)

module.exports = router