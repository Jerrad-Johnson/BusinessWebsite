const fs = require("fs");
const sharp = require("sharp");
const {pathToLocalFSGalleries, errorExistsNotInScript, errorExistsInScript, cc, fitMethods, resizeResolutions,
    pathToFullsizePhotos, pathToThumbnails, pathTo10pxThumbnails, pathsToPublicGalleries, pathToPublicGalleries,
    pathTo1920pxPhotos, pathToBase64Thumbnails, ct
} = require("../../../common/variables");
const path = require('path');
const fse = require('fs-extra');
var deasync = require('deasync');


exports.resizeGalleryImages = async (newFoldersAndFiles, galleryPath, resolution, fitMethod) => {
    let newDirectories = [];
    for (let folder in newFoldersAndFiles) newDirectories.push(folder);

    const extantDirectoriesIn10px = getDirectories(pathTo10pxThumbnails);
    const extantDirectoriesInThumbnails = getDirectories(pathToThumbnails);
    const extantDirectoriesIn1920px = getDirectories(pathTo1920pxPhotos);
    const extantDirectoriesInBase64 = getDirectories(pathToBase64Thumbnails)
    const extantDirectoriesWithOptions = [
        {dirs: extantDirectoriesIn1920px, path: pathTo1920pxPhotos, resize: {x: resizeResolutions.large.x, y: resizeResolutions.large.y}},
        {dirs: extantDirectoriesInThumbnails, path: pathToThumbnails, resize: {x: resizeResolutions.mapThumbnail.x, y: resizeResolutions.mapThumbnail.y}},
        {dirs: extantDirectoriesIn10px, path: pathTo10pxThumbnails, resize: {x: resizeResolutions.tenPx.x, y: resizeResolutions.tenPx.y}},
        {dirs: extantDirectoriesInBase64, path: pathToBase64Thumbnails}
    ];

    for (let entry of extantDirectoriesWithOptions) rmDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) mkDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) rmFiles(newDirectories, entry.path);
    extantDirectoriesWithOptions.pop();
    for (let entry of extantDirectoriesWithOptions) await mkImages(newFoldersAndFiles, entry.path);
    mkBase64Images(newFoldersAndFiles);


}

function getDirectories(source) {
    return fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}

function rmDirectoriesIfNeeded(newDir, extantDir, galleryPathByImageSize){
    for (let folder of extantDir){
        if (!newDir.find((e) => e === folder)){
            fse.removeSync(path.join(galleryPathByImageSize, folder));
            delete extantDir[folder];
        }
    }
}

function mkDirectoriesIfNeeded(newDir, extantDir, galleryPathByImageSize){
    for (let folder of newDir){
        if (!extantDir.find((e) => e === folder)) fs.mkdirSync(path.join(galleryPathByImageSize, folder));
    }
}

function rmFiles(newDirectories, galleryPathByImageSize) {
    for (folder of newDirectories){
        const files = fs.readdirSync(path.join(galleryPathByImageSize, folder));
        for (const file of files) {
            fs.unlinkSync(path.join(galleryPathByImageSize, folder, file), (err) => {
                if (err) throw err;
            });
        }
    }
}

async function mkImages(newFoldersAndFiles, galleryPathByImageSize, resolution){
    for (let folder in newFoldersAndFiles){
        for (let file of newFoldersAndFiles[folder]){
            let proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(250, 250);
             await proc.toFile(path.join(galleryPathByImageSize, folder, file));

        }
    }
}

function mkBase64Images(newFoldersAndFiles){
    for (let folder in newFoldersAndFiles){
        cc(pathTo10pxThumbnails, folder);
        cc(fs.readdirSync(`${pathTo10pxThumbnails}/${folder}`));
/*        for (let file of newFoldersAndFiles[folder]){
            let image = fs.readFileSync(`${pathTo10pxThumbnails}/${folder}/${file}`);
            cc(image);
            fs.writeFileSync(`${pathToBase64Thumbnails}/${folder}/${file}`, image, { encoding: 'base64' }, (err) => {
                throw new Error(err);
            });
        }*/
    }
}
