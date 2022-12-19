const fs = require("fs");
const sharp = require("sharp");

exports.createLeafletThumbnails = async (foldernames) => {
    for (folder of foldernames){
        if(!fs.existsSync(`public/leaflet/thumbnails/${folder}`)){
            fs.mkdirSync(`public/leaflet/thumbnails/${folder}`, { recursive: true });
        }
    }

    /*sharp('public/map_images/macro/162A2078.jpg').resize(300, 300).toFile('public/map_images/output2.jpg', (err) => {
        cc(err);
    });*/

    /*fs.readdir('public/map_images/macro/',(err, files) => {
        cc(files);
    });*/


}