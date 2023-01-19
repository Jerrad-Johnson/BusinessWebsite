const fs = require("fs");
const sharp = require("sharp");
const {pathToLocalFSGalleries, errorExistsNotInScript, errorExistsInScript, cc, fitMethods, resizeResolutions,
    pathToFullsizePhotos, pathToThumbnails, pathTo10pxThumbnails, pathsToPublicGalleries, pathToPublicGalleries,
    pathTo1920pxPhotos, pathToBase64Thumbnails, ct
} = require("../../../common/variables");
const path = require('path');
const fse = require('fs-extra');
sharp.cache(false)


exports.resizeGalleryImages = async (newFoldersAndFiles, galleryPath, resolution, fitMethod) => {
    let didScriptError = errorExistsNotInScript;

    let newDirectories = [];
    for (let folder in newFoldersAndFiles) newDirectories.push(folder);

    const extantDirectoriesIn10px = getDirectories(pathTo10pxThumbnails);
    const extantDirectoriesInThumbnails = getDirectories(pathToThumbnails);
    const extantDirectoriesIn1920px = getDirectories(pathTo1920pxPhotos);
    const extantDirectoriesInBase64 = getDirectories(pathToBase64Thumbnails)
    const extantDirectoriesWithOptions = [
        {dirs: extantDirectoriesIn1920px, path: pathTo1920pxPhotos, resize: [resizeResolutions.large.x, resizeResolutions.large.y]},
        {dirs: extantDirectoriesInThumbnails, path: pathToThumbnails, resize: [resizeResolutions.mapThumbnail.x, resizeResolutions.mapThumbnail.y]},
        {dirs: extantDirectoriesIn10px, path: pathTo10pxThumbnails, resize: [resizeResolutions.tenPx.x, resizeResolutions.tenPx.y]},
        {dirs: extantDirectoriesInBase64, path: pathToBase64Thumbnails}
    ];

    for (let entry of extantDirectoriesWithOptions) rmDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) mkDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) rmFiles(newDirectories, entry.path);
    extantDirectoriesWithOptions.pop();
    for (let entry of extantDirectoriesWithOptions) mkImages(newFoldersAndFiles, entry.path);



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

function mkImages(newFoldersAndFiles, galleryPathByImageSize){
    for (let folder in newFoldersAndFiles){
        for (let file of newFoldersAndFiles[folder]){
            sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside })
                .resize(resizeResolutions.large.x, resizeResolutions.large.y)
                .toFile(path.join(galleryPathByImageSize, folder, file), (err) => {
                    if (err){
                        ct(err);
                        return;
                    }
                });
        }
    }
}

