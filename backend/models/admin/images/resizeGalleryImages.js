const fs = require("fs");
const sharp = require("sharp");
const {pathToLocalFSGalleries, errorExistsNotInScript, errorExistsInScript, cc, fitMethods, resizeResolutions,
    pathToFullsizePhotos, pathToThumbnails, pathTo10pxThumbnails, pathsToPublicGalleries, pathToPublicGalleries,
    pathTo1920pxPhotos, pathToBase64Thumbnails
} = require("../../../common/variables");
const path = require('path');
const fse = require('fs-extra');


exports.resizeGalleryImages = async (foldernames, galleryPath, resolution, fitMethod) => {
    let didScriptError = errorExistsNotInScript;

    let newDirectories = [];
    for (let folder in foldernames){
        newDirectories.push(folder);
    }

    const extantDirectoriesIn10px = getDirectories(pathTo10pxThumbnails);
    const extantDirectoriesInThumbnails = getDirectories(pathToThumbnails);
    const extantDirectoriesIn1920px = getDirectories(pathTo1920pxPhotos);
    const extantDirectoriesInBase64 = getDirectories(pathToBase64Thumbnails)
    const extantDirectoriesWithPaths = [
        {dirs: extantDirectoriesIn10px, path: pathTo10pxThumbnails},
        {dirs: extantDirectoriesInThumbnails, path: pathToThumbnails},
        {dirs: extantDirectoriesIn1920px, path: pathTo1920pxPhotos},
        {dirs: extantDirectoriesInBase64, path: pathToBase64Thumbnails},
    ];

    for (let entry of extantDirectoriesWithPaths){
        rmDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    }

    for (let entry of extantDirectoriesWithPaths) {
        mkDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    }








    /*let galleryPaths = [];
    for (let path in pathsToPublicGalleries){
        galleryPaths.push(pathsToPublicGalleries[path]);
    }

    cc(galleryPaths)*/



/*
    let map = {};
    for (let folder of newDirectories){
        map[folder] = 1;
    }



    for (let folder of extantDirectories){
        if (folder in map) cc(5);
    }
*/

/*    for (folder of foldernames){
        if(!fs.existsSync(path.join(galleryPath, folder))){
            await fs.mkdirSync(path.join(galleryPath, folder), { recursive: true }, (err) => {
                didScriptError = errorExistsInScript;
                cc(err);
            });
        }
    }
    if (didScriptError) return errorExistsInScript;*/

    for (let folder in foldernames){
        for (let file of foldernames[folder]){
            const pathToThisImage = path.join(`${pathToLocalFSGalleries}/${folder}/${file}`);
/*            await sharp(pathToThisImage)
                .resize(resizeResolutions.large.x, resizeResolutions.large.y, {fit: fitMethods.inside}).withMetadata()
                .toFile(path.join(pathToFullsizePhotos, folder, file))*/
            }
        }

    return didScriptError;
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