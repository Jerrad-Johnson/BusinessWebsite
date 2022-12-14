const fs = require("fs");
const sharp = require("sharp");
const {pathToLeafletThumbnails, pathToLeafletImages, errorExistsNotInScript, errorExistsInScript, cc} = require("../../../common/variables");

exports.createLeafletThumbnails = async (foldernames) => {
    let didScriptError = errorExistsNotInScript;

    if(fs.existsSync(pathToLeafletThumbnails)){
        fs.rm(pathToLeafletThumbnails, { recursive: true }, (err) => {
            didScriptError = errorExistsInScript;
            cc(err)
        });
    }
    if (didScriptError) return errorExistsInScript;

    for (folder of foldernames){
        if(!fs.existsSync(`${pathToLeafletThumbnails}/${folder}`)){
            fs.mkdirSync(`${pathToLeafletThumbnails}/${folder}`, { recursive: true }, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }
    if (didScriptError) return errorExistsInScript;

    for (let folder of foldernames){
        let files = await fs.promises.readdir(`${pathToLeafletImages}/${folder}`);
        for (let file of files){
            await sharp(`${pathToLeafletImages}/${folder}/${file}`).resize(300, 300).withMetadata()
            .toFile(`${pathToLeafletThumbnails}/${folder}/${file}`, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }

    return didScriptError;
}