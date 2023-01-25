var express = require('express');
const {cc} = require("../common/variables");
const {getThisFolderOfImages} = require("../models/gallery/getThisFolderOfImages");
var router = express.Router();

/* GET home page. */
router.post('/getThisFolder', function(req, res, next) {
    getThisFolderOfImages(req, res, next);
});

module.exports = router;
