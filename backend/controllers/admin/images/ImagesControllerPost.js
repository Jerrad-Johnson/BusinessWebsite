const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate");
const {updateLeafletPhotosTable} = require("../../../models/admin/images/updateLeafletPhotosTable");
const {standardizedResponse} = require("../../../utils/fns");
const {resizeGalleryImages} = require("../../../models/admin/images/resizeGalleryImages");
const {errorExistsInScript, cc, pathToLeafletThumbnails, fitMethods, resizeResolutions, pathTo1920pxPhotos,
    pathTo10pxThumbnails
} = require("../../../common/variables");
const {create10pxThumbnails} = require("../../../models/admin/images/create10pxThumbnails");
const {createBase64Thumbnails} = require("../../../models/admin/images/createBase64Thumbnails");


exports.ImagesControllerPost = async (req, res, next) => {
/*    if (!adminIsLoggedIn(req, res)) {
        res.status(403).send(standardizedResponse("User is not logged in as Admin."));
        return;
    }*/

    // Script does not work in windows. Stop using it for now.

    let foldernames = await getFoldernamesForMapUpdate();
    if (foldernames === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to find image folders."));
        return;
    }

    /*let create1920pxResult = await resizeGalleryImages(foldernames, pathTo1920pxPhotos, resizeResolutions.large, fitMethods.inside);
    if (create1920pxResult === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to create large images."));
        return;
    }*/

    let createThumbnailResult = await resizeGalleryImages(foldernames, pathToLeafletThumbnails, resizeResolutions.mapThumbnail, fitMethods.inside);
    if (createThumbnailResult === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to create thumbnails."));
        return;
    }

    /*let create10pxResults = await resizeGalleryImages(foldernames, pathTo10pxThumbnails, resizeResolutions.base64Prep, fitMethods.inside);
    if (create10pxResults === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to create 10px thumbnails."));
        return;
    }*/

    let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    if (fileAndFolderNames === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to get filenames for map update."));
        return;
    }

    let base64ThumbnailResults = await createBase64Thumbnails(req, res, fileAndFolderNames);
    if (base64ThumbnailResults === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to create base64 thumbnails."));
        return;
    }

    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    if (rawExifData === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to get exif data from images."));
        return;
    }

    let formattedExifData = await formatExifForMapUpdate(rawExifData);
    if (formattedExifData === errorExistsInScript) {
        res.status(500).send(standardizedResponse("Failed to reformat image exif data."));
        return;
    }

    let imageDataSaved = await updateLeafletPhotosTable(req, res, formattedExifData);
    if (imageDataSaved === errorExistsInScript) return;

/*    let createTinyThumbnailResults = await create10pxThumbnails(req, res, fileAndFolderNames);
    if (createTinyThumbnailResults === errorExistsInScript) return;*/

    res.status(200).send(standardizedResponse("Updated Leaflet"));
}



/*
if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error*/
