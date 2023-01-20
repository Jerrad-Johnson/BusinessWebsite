const ExifReader = require('exifreader');
const {pathToLeafletThumbnailsForExifReader, cc, errorExistsInScript, ct, pathToThumbnails,
    pathToLocalhostGalleryThumbnails
} = require("../../../common/variables");
const path = require("path");

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let entry;
    let exifResults = {};

    try {
        for (let folderName in fileAndFolderNames){
            exifResults[folderName] = [];
            for (let fileName of fileAndFolderNames[folderName]){
                entry = await ExifReader.load(path.join(pathToLocalhostGalleryThumbnails, folderName, fileName));
                entry.fileName = fileName;
                exifResults[folderName].push(entry);
            }
        }
    } catch (e) {
        ct(e);
        return errorExistsInScript;
    }

    return exifResults;
}