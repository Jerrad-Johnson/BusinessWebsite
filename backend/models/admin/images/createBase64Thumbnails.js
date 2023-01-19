const {cc, pathToBase64Thumbnails, pathTo10pxThumbnails} = require("../../../common/variables");
const fs = require("fs");

exports.createBase64Thumbnails = async (req, res, fileAndFolderNames) => {
    try{
        if(fs.existsSync(pathToBase64Thumbnails)){
            await fs.rm(pathToBase64Thumbnails, { recursive: true }, (err) => {
                throw new Error(err);
            });
        }

        setTimeout(() => {}, 500);

        for (folder in fileAndFolderNames){
            if(!fs.existsSync(`${pathToBase64Thumbnails}/${folder}`)){
                await fs.mkdir(`${pathToBase64Thumbnails}/${folder}`, { recursive: true }, (err) => {
                    throw new Error(err);
                });
            }
        }

        for (let folder in fileAndFolderNames){
            for (let file of fileAndFolderNames[folder]){
                //console.log(fileAndFolderNames[folder]);
                console.log(fs.existsSync(pathToBase64Thumbnails))
                /*let image = await fs.readFileSync(`${pathTo10pxThumbnails}/${folder}/${file}`);
                await fs.writeFile(`${pathToBase64Thumbnails}/${folder}/${file}`, image, { encoding: 'base64' }, (err) => {
                    throw new Error(err);
                });*/
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}