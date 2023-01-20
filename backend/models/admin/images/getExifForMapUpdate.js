const ExifReader = require('exifreader');
const {pathToLeafletThumbnailsForExifReader, cc, errorExistsInScript, ct, pathToThumbnails,
    pathToLocalhostGalleryThumbnailsWithExif, pathToLocalhostGallery1920pxThumbnailsWithExif,
    pathToLocalhostGallery10pxThumbnailsWithExif
} = require("../../../common/variables");
const path = require("path");

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let largeImg, thumbnailImg, tinyImg;
    let largeImgsExif = {}, thumbnailImgsExif = {}, tinyImgsExif = {};

    try {
        for (let folderName in fileAndFolderNames){
            largeImgsExif[folderName] = [];
            thumbnailImgsExif[folderName] = [];
            tinyImgsExif[folderName] = [];
            for (let fileName of fileAndFolderNames[folderName]){
                largeImg = await ExifReader.load(path.join(pathToLocalhostGallery1920pxThumbnailsWithExif, folderName, fileName));
                largeImg.fileName = fileName;
                largeImgsExif[folderName].push(largeImg);

                thumbnailImg = await ExifReader.load(path.join(pathToLocalhostGalleryThumbnailsWithExif, folderName, fileName));
                thumbnailImg.fileName = fileName;
                thumbnailImgsExif[folderName].push(thumbnailImg);

                tinyImg = await ExifReader.load(path.join(pathToLocalhostGallery10pxThumbnailsWithExif, folderName, fileName));
                tinyImg.fileName = fileName;
                tinyImgsExif[folderName].push(tinyImg);
            }
        }
    } catch (e) {
        ct(e);
        return errorExistsInScript;
    }

    return {largeImgsExif, thumbnailImgsExif, tinyImgsExif};
}