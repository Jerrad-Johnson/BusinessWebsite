var express = require('express');
const {cc} = require("../common/variables");
const {GalleryImagesByFolderPost} = require("../controllers/gallery/images/GalleryImagesByFolderPost");
var router = express.Router();

/* GET home page. */
router.post('/getThisFolder', function(req, res, next) {
    GalleryImagesByFolderPost(req, res, next);
});

module.exports = router;
