var express = require('express');
const {cc} = require("../common/variables");
const {GalleryImagesByFolderPost} = require("../controllers/gallery/images/GalleryImagesByFolderPost");
const {GalleryFoldersGet} = require("../controllers/gallery/images/GalleryFoldersGet");
var router = express.Router();

router.post('/getThisFolder', function(req, res, next) {
    GalleryImagesByFolderPost(req, res, next);
});

router.get('/getGalleryFolders', (req, res, next) => {
    GalleryFoldersGet(req, res, next);
})


module.exports = router;
