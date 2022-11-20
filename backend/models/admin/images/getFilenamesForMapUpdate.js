const fs = require('fs');

exports.getFilenamesForMapUpdate = async (req) => {
    //TODO Update folder path
    const imagePath = `./public/map_images/macro/`
    const allImageFileNames = await fs.promises.readdir(imagePath);
    return allImageFileNames;
}
