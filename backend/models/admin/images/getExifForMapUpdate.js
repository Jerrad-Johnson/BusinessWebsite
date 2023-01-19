const ExifReader = require('exifreader');
const {pathToLeafletThumbnailsForExifReader, cc, errorExistsInScript} = require("../../../common/variables");

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let entry;
    let exifResults = {};

    console.log(fileAndFolderNames)

    try {
        for (let folderName in fileAndFolderNames){
            exifResults[folderName] = [];
            for (let fileName of fileAndFolderNames[folderName]){
                /*console.log(fileName);
                console.log(`${pathToLeafletThumbnailsForExifReader}/${folderName}/${fileName}`);*/
                entry = await ExifReader.load(`${pathToLeafletThumbnailsForExifReader}/${folderName}/${fileName}`);
                entry.fileName = fileName;
                exifResults[folderName].push(entry);
            }
        }
    } catch (e) {
        cc(e);
        return errorExistsInScript;
    }

    return exifResults;
}