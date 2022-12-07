const fs = require('fs');

exports.getFilenamesForMapUpdate = async (foldernames) => {
    //TODO Update folder path
    const imagePath = `./public/map_images/`
    let foldersAndFiles = {};

    for (let entry of foldernames){
        let files = await fs.promises.readdir(`${imagePath}${entry}`);
        if (files.length > 0) foldersAndFiles[entry] = files;
        files = [];
    }

    return foldersAndFiles;
}
