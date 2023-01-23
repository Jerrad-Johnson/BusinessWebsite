const fs = require("fs");
const sharp = require("sharp");
const {pathToLocalFSGalleries, errorExistsNotInScript, errorExistsInScript, cc, fitMethods, resizeResolutions,
    pathToFullsizePhotos, pathToThumbnails, pathTo10pxThumbnails, pathsToPublicGalleries, pathToPublicGalleries,
    pathTo1920pxPhotos, pathToBase64Thumbnails, ct, pathToExifThumbnails, baseGalleryDirectories,
    pathToExif10pxThumbnails, pathToExif1920pxPhotos, pathToLocalhostGallery1920pxThumbnailsWithExif
} = require("../../../common/variables");
const path = require('path');
const fse = require('fs-extra');
const ExifReader = require("exifreader");

exports.resizeGalleryImages = async (newFoldersAndFiles, galleryPath, resolution, fitMethod) => {
    const newDirectories = Object.keys(newFoldersAndFiles);

    createBaseDirectories();
    const extantDirectoriesIn1920px = getDirectories(pathTo1920pxPhotos);
    const extantDirectoriesInExif1920px = getDirectories(pathToExif1920pxPhotos);
    const extantDirectoriesInThumbnails = getDirectories(pathToThumbnails);
    const extantDirectoriesInExifThumbnails = getDirectories(pathToExifThumbnails)
    const extantDirectoriesIn10px = getDirectories(pathTo10pxThumbnails);
    const extantDirectoriesInExif10px = getDirectories(pathToExif10pxThumbnails)
    const extantDirectoriesInBase64 = getDirectories(pathToBase64Thumbnails);
    const extantDirectoriesWithOptions = [
        {dirs: extantDirectoriesIn1920px, path: pathTo1920pxPhotos},
        {dirs: extantDirectoriesInExif1920px, path: pathToExif1920pxPhotos},
        {dirs: extantDirectoriesInThumbnails, path: pathToThumbnails},
        {dirs: extantDirectoriesInExifThumbnails, path: pathToExifThumbnails},
        {dirs: extantDirectoriesIn10px, path: pathTo10pxThumbnails},
        {dirs: extantDirectoriesInExif10px, path: pathToExif10pxThumbnails},
        {dirs: extantDirectoriesInBase64, path: pathToBase64Thumbnails},
    ];

    for (let entry of extantDirectoriesWithOptions) rmDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) mkDirectoriesIfNeeded(newDirectories, entry.dirs, entry.path);
    for (let entry of extantDirectoriesWithOptions) rmFiles(newDirectories, entry.path);
    await mkImages(newFoldersAndFiles);
    mkBase64Images(newFoldersAndFiles);
}

function createBaseDirectories(){
    for (entry of baseGalleryDirectories){
        if (!fs.existsSync(path.join(pathToPublicGalleries, entry))) fs.mkdirSync(path.join(pathToPublicGalleries, entry));
    }
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

async function mkImages(newFoldersAndFiles){
    let resizeValue = {};
    for (let folder in newFoldersAndFiles){
        for (let file of newFoldersAndFiles[folder]){
            let image = fs.readFileSync(path.join(pathToLocalFSGalleries, folder, file));

            let exif = await ExifReader.load(image);
            let width = exif['Image Width'].value;
            let height = exif['Image Height'].value;

            if (width >= height){
                resizeValue.largeImg = {width: resizeResolutions.large};
                resizeValue.smallImg = {width: resizeResolutions.mapThumbnail};
                resizeValue.tinyImg = {width: resizeResolutions.tenPx};
            } else {
                resizeValue.largeImg = {height: resizeResolutions.large};
                resizeValue.smallImg = {height: resizeResolutions.mapThumbnail};
                resizeValue.thumbnail = {height: resizeResolutions.mapThumbnail}
            }

            let proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.largeImg);
            await proc.toFile(path.join(pathTo1920pxPhotos, folder, file));

            proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.largeImg).withMetadata();
            await proc.toFile(path.join(pathToExif1920pxPhotos, folder, file));

            proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.smallImg);
            await proc.toFile(path.join(pathToThumbnails, folder, file));

            proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.smallImg).withMetadata(); // By creating a separate set with exif data, the thumbnails that the frontend loads have their file size cut by about 80%.
            await proc.toFile(path.join(pathToExifThumbnails, folder, file));

            proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.tinyImg);
            await proc.toFile(path.join(pathTo10pxThumbnails, folder, file));

            proc = sharp(path.join(pathToLocalFSGalleries, folder, file),
                { fit: fitMethods.inside }).resize(resizeValue.tinyImg).withMetadata();
            await proc.toFile(path.join(pathToExif10pxThumbnails, folder, file));
        }
    }
}

function mkBase64Images(newFoldersAndFiles){
    for (let folder in newFoldersAndFiles){
        for (let file of newFoldersAndFiles[folder]){
            let image = fs.readFileSync(`${pathTo10pxThumbnails}/${folder}/${file}`);
            fs.writeFileSync(`${pathToBase64Thumbnails}/${folder}/${file}`, image, { encoding: 'base64' }, (err) => {
                throw new Error(err);
            });
        }
    }
}
