const {cc, pathTo10pxThumbnails, errorExistsInScript, pathToLocalFSGalleries, pathToThumbnails,
    errorExistsNotInScript
} = require("../../../common/variables");
const fs = require("fs");
const sharp = require("sharp");

exports.create10pxThumbnails = async (req, res, fileAndFolderNames) => {
    let didScriptError = errorExistsNotInScript;

    if(fs.existsSync(pathTo10pxThumbnails)){
        fs.rm(pathTo10pxThumbnails, { recursive: true }, (err) => {
            didScriptError = errorExistsInScript;
            cc(err)
        });
    }
    if (didScriptError) return errorExistsInScript;

    for (folder in fileAndFolderNames){
        if(!fs.existsSync(`${pathTo10pxThumbnails}/${folder}`)){
            fs.mkdirSync(`${pathTo10pxThumbnails}/${folder}`, { recursive: true }, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }
    if (didScriptError) return errorExistsInScript;

    for (let folder in fileAndFolderNames){
        let files = await fs.promises.readdir(`${pathToThumbnails}/${folder}`);
        for (let file of fileAndFolderNames[folder]){
            await sharp(`${pathToLocalFSGalleries}/${folder}/${file}`).resize(10, 10)
                .toFile(`${pathTo10pxThumbnails}/${folder}/${file}`, (err) => {
                    didScriptError = errorExistsInScript;
                    cc(err);
                });
        }
    }

    return didScriptError;

}
