const ExifReader = require('exifreader');

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let entry;
    let exifResults = [];
    const imagePath = `./public/map_images`

    for (let folderName in fileAndFolderNames){
        for (let fileName of fileAndFolderNames[folderName]){
            cc(`${imagePath}/${folderName}/${fileName}`);
        }
        /*entry = await ExifReader.load(`${imagePath}/${folderName}/${fileName}`);
        entry.fileName = fileName;
        exifResults.push(entry);*/
    }

    //return exifResults;
}