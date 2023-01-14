const fs = require('fs');
const {pathToGalleryImages, errorExistsInScript, errorExistsNotInScript, cc} = require("../../../common/variables");

exports.getFilenamesForMapUpdate = async (foldernames) => {
    //TODO Update folder path
    let foldersAndFiles = {};
    let didScriptError = errorExistsNotInScript;

    for (let entry of foldernames){
        if (didScriptError) break;

        let files = await fs.promises.readdir(`${pathToGalleryImages}/${entry}`, {}, (err) => {
            didScriptError = errorExistsInScript
            cc(err);
        });

        if (files.length > 0) foldersAndFiles[entry] = files;
        files = [];
    }

    if (didScriptError) return errorExistsInScript;
    return foldersAndFiles;
}
