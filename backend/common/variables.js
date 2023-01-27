exports.cc = console.log;
exports.ct = console.trace;
exports.errorExistsInScript = true;
exports.errorExistsNotInScript = false;
//const serverURL = "https://business.jerradjohnson.com:3002";
const serverURL = "http://localhost:3002";
exports.frontendURL = "https://business.jerradjohnson.com";

// Company-specific
exports.businessName = "Ideal Portraits";

// Gallery images
exports.pathToLocalFSGalleries = "./photographs/galleries";
exports.pathToPublicGalleries = "./public/galleries";
const pathTo10pxThumbnails = "./public/galleries/10px_thumbnails";
const pathToExif10pxThumbnails = "./public/galleries/10px_thumbnails_exif";
const pathToThumbnails = "./public/galleries/thumbnails";
const pathToExifThumbnails = "./public/galleries/thumbnails_exif";
const pathTo1920pxPhotos = "./public/galleries/1920px_photos/";
const pathToExif1920pxPhotos = "./public/galleries/1920px_photos_exif";
const pathToBase64Thumbnails = "./public/galleries/base64_thumbnails";
exports.baseGalleryDirectories = ["10px_thumbnails", "10px_thumbnails_exif", "thumbnails", "thumbnails_exif", "1920px_photos", "1920px_photos_exif", "base64_thumbnails"];
exports.pathToFullsizePhotos = "./public/galleries/fullsize_photos/";
exports.pathToLocalFSGalleryThumbnailsWithExif = "./public/galleries/thumbnails_exif";
exports.pathToLocalFSGallery10pxThumbnailsWithExif = "./public/galleries/10px_thumbnails_exif";
exports.pathToLocalFSGallery1920pxThumbnailsWithExif = "./public/galleries/1920px_photos_exif";
exports.publicPathToLgImgs = `${serverURL}/galleries/1920px_photos`;
exports.publicPathToSmImgs = `${serverURL}/galleries/thumbnails`;
exports.publicPathToTinyImgs = `${serverURL}/galleries/10px_thumbnails`; // TODO These, and many others, need to be updated. In this case, environment variable is important.
exports.publicPathToBase64Imgs = `${serverURL}/galleries/base64_thumbnails`; // TODO These, and many others, need to be updated. In this case, environment variable is important.
exports.pathsToPublicGalleries = {
    pathTo1920pxPhotos: pathTo1920pxPhotos,
    pathTo10pxThumbnails: pathTo10pxThumbnails,
    pathToThumbnails: pathToThumbnails,
    pathToBase64Thumbnails: pathToBase64Thumbnails,
}
exports.pathTo10pxThumbnails = pathTo10pxThumbnails;
exports.pathToBase64Thumbnails = pathToBase64Thumbnails;
exports.pathTo1920pxPhotos = pathTo1920pxPhotos;
exports.pathToThumbnails = pathToThumbnails;
exports.pathToExifThumbnails = pathToExifThumbnails;
exports.pathToExif10pxThumbnails = pathToExif10pxThumbnails;
exports.pathToExif1920pxPhotos = pathToExif1920pxPhotos;

exports.galleryTableNameLg = "gallery_lg_images";
exports.galleryTableNameSm = "gallery_sm_images";
exports.galleryTableNameTiny = "gallery_tiny_images";

// Options for Sharp
exports.fitMethods = {
    inside: "inside",
}
exports.resizeResolutions = {
    mapThumbnail: 300,
    tenPx: 10,
    large: 1920,
}