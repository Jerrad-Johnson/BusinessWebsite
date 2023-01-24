const ExifReader = require('exifreader');
const {pathToLeafletThumbnailsForExifReader, cc, errorExistsInScript, ct, pathToThumbnails,
    pathToLocalFSGalleryThumbnailsWithExif, pathToLocalFSGallery1920pxThumbnailsWithExif,
    pathToLocalFSGallery10pxThumbnailsWithExif
} = require("../../../common/variables");
const path = require("path");
const {readFileSync} = require("fs");

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let largeImgBuffer, smallImgBuffer, tinyImgBuffer;
    let largeImg, smallImg, tinyImg;
    let largeImgsExif = {}, smallImgsExif = {}, tinyImgsExif = {};

    try {
        for (let folderName in fileAndFolderNames){
            largeImgsExif[folderName] = [];
            smallImgsExif[folderName] = [];
            tinyImgsExif[folderName] = [];
            for (let fileName of fileAndFolderNames[folderName]){
                largeImgBuffer = readFileSync(path.join(pathToLocalFSGallery1920pxThumbnailsWithExif, folderName, fileName))
                largeImg = await ExifReader.load(largeImgBuffer);
                largeImg.fileName = fileName;
                largeImgsExif[folderName].push(largeImg);

                smallImgBuffer = readFileSync(path.join(pathToLocalFSGalleryThumbnailsWithExif, folderName, fileName))
                smallImg = await ExifReader.load(smallImgBuffer);
                smallImg.fileName = fileName;
                smallImgsExif[folderName].push(smallImg);

                tinyImgBuffer = readFileSync(path.join(pathToLocalFSGallery10pxThumbnailsWithExif, folderName, fileName))
                tinyImg = await ExifReader.load(tinyImgBuffer);
                tinyImg.fileName = fileName;
                tinyImgsExif[folderName].push(tinyImg);
            }
        }
    } catch (e) {
        ct(e);
        return errorExistsInScript;
    }

    return {largeImgsExif, smallImgsExif, tinyImgsExif};
}