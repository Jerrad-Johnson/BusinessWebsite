const {cc, pathToBase64Thumbnails,
    errorExistsNotInScript,
    errorExistsInScript,
    pathToLeafletThumbnails,
    pathToLeafletImages, pathTo10pxThumbnails
} = require("../../../common/variables");
const fs = require("fs");
const sharp = require("sharp");

exports.createBase64Thumbnails = async (req, res, fileAndFolderNames) => {

    let didScriptError = errorExistsNotInScript;

    if(fs.existsSync(pathToBase64Thumbnails)){
        fs.rm(pathToBase64Thumbnails, { recursive: true }, (err) => {
            didScriptError = errorExistsInScript;
            cc(err)
        });
    }
    if (didScriptError) return errorExistsInScript;

    for (folder in fileAndFolderNames){
        if(!fs.existsSync(`${pathToBase64Thumbnails}/${folder}`)){
            fs.mkdirSync(`${pathToBase64Thumbnails}/${folder}`, { recursive: true }, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }
    if (didScriptError) return errorExistsInScript;

    for (let folder in fileAndFolderNames){
        for (let file of fileAndFolderNames[folder]){
            let image = await fs.readFileSync(`${pathTo10pxThumbnails}/${folder}/${file}`, 'base64');
            fs.writeFile(`${pathToBase64Thumbnails}/${folder}/${file}`, image, (err) => {
               didScriptError = errorExistsInScript;
               cc(err);
            });
        }
    }

    return didScriptError;
    

    /*var jpg = fs.readFileSync(`${pathToBase64Thumbnails}/macro/162A2078.jpg`);
    cc(Buffer.from(jpg).toString('base64'));*/
}