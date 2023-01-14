const fs = require("fs");
const {pathToGalleryImages, cc, errorExistsNotInScript, errorExistsInScript} = require("../../../common/variables");

exports.getFoldernamesForMapUpdate = async () => {
    let didScriptError = errorExistsNotInScript

    let readResults = await fs.promises.readdir(pathToGalleryImages, {}, (err) => {
        didScriptError = errorExistsInScript;
        cc(err);
    });

    if (didScriptError) return errorExistsInScript;
    return readResults;

}