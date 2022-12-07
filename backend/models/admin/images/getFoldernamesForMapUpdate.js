const fs = require("fs");

exports.getFoldernamesForMapUpdate = async () => {
    return await fs.promises.readdir('./public/map_images');
}