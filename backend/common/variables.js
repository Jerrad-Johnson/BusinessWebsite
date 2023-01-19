exports.ct = console.trace;
exports.cc = console.log;
exports.errorExistsInScript = true;
exports.errorExistsNotInScript = false;
exports.businessName = "Ideal Portraits";
exports.pathToLocalFSGalleries = "./photographs/galleries";
exports.pathToPublicGalleries = "./public/galleries";
const pathTo10pxThumbnails = "./public/galleries/10px_thumbnails";
const pathToThumbnails = "./public/galleries/thumbnails";
const pathToBase64Thumbnails = "./public/galleries/base64_thumbnails";
const pathTo1920pxPhotos = "./public/galleries/1920px_photos/";
exports.pathToFullsizePhotos = "./public/galleries/fullsize_photos/";
exports.fitMethods = {
    inside: "inside",
}
exports.pathsToPublicGalleries = {
    pathTo1920pxPhotos: pathTo1920pxPhotos,
    pathTo10pxThumbnails: pathTo10pxThumbnails,
    pathToThumbnails: pathToThumbnails,
    pathToBase64Thumbnails: pathToBase64Thumbnails,
}
exports.resizeResolutions = {
    mapThumbnail: {x: 300, y: 300},
    tenPx: {x: 10, y: 10},
    large: {x: 1920, y: 1920},
}


exports.pathTo10pxThumbnails = pathTo10pxThumbnails;
exports.pathToBase64Thumbnails = pathToBase64Thumbnails;
exports.pathTo1920pxPhotos = pathTo1920pxPhotos;
exports.pathToThumbnails = pathToThumbnails;
