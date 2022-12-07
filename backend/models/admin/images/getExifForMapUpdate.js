const ExifReader = require('exifreader');

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let entry;
    let exifResults = {};
    const imagePath = `./public/map_images`

    for (let folderName in fileAndFolderNames){
        exifResults[folderName] = [];
        for (let fileName of fileAndFolderNames[folderName]){
            entry = await ExifReader.load(`${imagePath}/${folderName}/${fileName}`);
            entry.fileName = fileName;
            exifResults[folderName].push(entry);
        }
    }
    return exifResults;
}