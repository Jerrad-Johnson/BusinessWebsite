const fs = require("fs");
const {pathToLocalFSGalleries, cc, errorExistsNotInScript, errorExistsInScript} = require("../../../common/variables");

exports.getFoldernamesForMapUpdate = async () => {
    let didScriptError = errorExistsNotInScript

    let readResults = await fs.promises.readdir(pathToLocalFSGalleries, {}, (err) => {
        didScriptError = errorExistsInScript;
        cc(err);
    });

    if (didScriptError) return errorExistsInScript;
    return readResults;

}