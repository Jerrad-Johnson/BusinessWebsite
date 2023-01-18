const fs = require("fs");
const sharp = require("sharp");
const {pathToGalleryImages, errorExistsNotInScript, errorExistsInScript, cc} = require("../../../common/variables");

exports.resizeGalleryImages = async (foldernames, path, resolution, fitMethod, ) => {
    let didScriptError = errorExistsNotInScript;

    if(fs.existsSync(path)){
        await fs.rm(path, { recursive: true }, (err) => {
            didScriptError = errorExistsInScript;
            cc(err)
        });
    }
    if (didScriptError) return errorExistsInScript;

    for (folder of foldernames){
        if(!fs.existsSync(`${path}/${folder}`)){
            await fs.mkdirSync(`${path}/${folder}`, { recursive: true }, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }
    if (didScriptError) return errorExistsInScript;

    for (let folder of foldernames){
        let files = await fs.promises.readdir(`${pathToGalleryImages}/${folder}`);
        for (let file of files){
            await sharp(`${pathToGalleryImages}/${folder}/${file}`).resize(resolution.x, resolution.y, {fit: fitMethod}).withMetadata()
            .toFile(`${path}/${folder}/${file}`, (err) => {
                if (err){
                    didScriptError = errorExistsInScript;
                    console.log('Failed to write file.');
                }
            });
        }
    }

    return didScriptError;
}