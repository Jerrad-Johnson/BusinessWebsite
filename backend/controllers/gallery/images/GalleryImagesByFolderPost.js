const {getThisFolderOfImages} = require("../../../models/gallery/getThisFolderOfImages");

exports.GalleryImagesByFolderPost = async (req, res, next) => {
    getThisFolderOfImages(req, res, next);
}