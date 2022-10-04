var express = require('express');
var router = express.Router();
const imagesRouter = require('./images');

router.use('/images', imagesRouter);

module.exports = router;
