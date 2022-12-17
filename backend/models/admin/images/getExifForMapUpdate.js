const ExifReader = require('exifreader');

exports.getExifForMapUpdate = async (fileAndFolderNames) => {
    let entry;
    let exifResults = {};
    const imagePath = `http://localhost:3001/map_images`
    cc(process.cwd());

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