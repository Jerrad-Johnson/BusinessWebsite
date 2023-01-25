var express = require('express');
const {cc} = require("../common/variables");
const {getThisFolderOfImages} = require("../models/gallery/getThisFolderOfImages");
var router = express.Router();

/* GET home page. */
router.get('/getThisFolder', function(req, res, next) {
    getThisFolderOfImages();
});

module.exports = router;
