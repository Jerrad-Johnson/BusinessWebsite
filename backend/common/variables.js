exports.cc = console.trace;
exports.errorExistsInScript = true;
exports.errorExistsNotInScript = false;
exports.businessName = "Ideal Portraits";
exports.pathToGalleryImages = "./photographs/galleries";
exports.pathToLeafletThumbnails = "./public/galleries/thumbnails";
exports.pathTo10pxThumbnails = "./public/galleries/10px_thumbnails";
exports.pathToBase64Thumbnails = "./public/galleries/base64_thumbnails";
exports.pathToLeafletThumbnailsForExifReader = "http://localhost:3001/galleries/thumbnails";
exports.pathTo1920pxPhotos = "./public/galleries/1920px_photos/";
exports.pathToFullsizePhotos = "./public/galleries/fullsize_photos/";
exports.fitMethods = {
    inside: "inside",
}
exports.resizeResolutions = {
    mapThumbnail: {x: 300, y: 300},
    base64Prep: {x: 10, y: 10},
    large: {x: 1920, y: 1920},
}
