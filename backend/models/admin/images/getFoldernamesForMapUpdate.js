const fs = require("fs");
const {pathToLeafletImages} = require("../../../common/variables");


exports.getFoldernamesForMapUpdate = async () => {
    return await fs.promises.readdir(pathToLeafletImages, (err) => { cc(err) });
}