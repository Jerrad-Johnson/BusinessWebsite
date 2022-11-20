const ExifReader = require('exifreader');

exports.getExifForMapUpdate = async (req, allImageFileNames) => {
    let entry;
    let exifResults = [];
    const imagePath = `./public/map_images/macro/`

    for (let fileName of allImageFileNames){
        entry = await ExifReader.load(imagePath + fileName);
        entry.fileName = fileName;
        exifResults.push(entry);
    }

    return exifResults;
}