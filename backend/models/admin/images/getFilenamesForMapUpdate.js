const fs = require('fs');

exports.getFilenamesForMapUpdate = async (req) => {
    //TODO Update folder path
    const imagePath = `./public/map_images/macro/`
    const allImageFileNames = await fs.promises.readdir(imagePath);

    let test = await fs.promises.readdir('./public/map_images');
    cc(test);
    return allImageFileNames;
}
