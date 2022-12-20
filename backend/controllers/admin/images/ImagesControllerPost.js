const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate");
const {updateLeafletPhotos} = require("../../../models/admin/images/updateLeafletPhotos");
const {standardizedResponse} = require("../../../utils/fns");
const {createLeafletThumbnails} = require("../../../models/admin/images/createLeafletThumbnails");
const {errorExistsInScript, cc} = require("../../../common/variables");

exports.ImagesControllerPost = async (req, res, next) => {
    //if (!adminIsLoggedIn(req, res)) return;

    let foldernames = await getFoldernamesForMapUpdate();
    if (foldernames === errorExistsInScript) res.status(500).send(standardizedResponse("Failed to find image folders."));

    /*let createThumbnailResult = await createLeafletThumbnails(foldernames);
    if (createThumbnailResult === errorExistsInScript) res.status(500).send(standardizedResponse("Failed to create thumbnails."));*/

    let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    if (fileAndFolderNames === errorExistsInScript) res.status(500).send(standardizedResponse("Failed to get filenames for map update."));

    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    if (rawExifData === errorExistsInScript) res.status(500).send(standardizedResponse("Failed to get exif data from images."));

    cc(rawExifData) // ... TODO Sharp is removing exif data.

    /*let formattedExifData = await formatExifForMapUpdate(rawExifData);
    if (formattedExifData === errorExistsInScript) res.status(500).send(standardizedResponse("Failed to reformat image exif data."));*/

    /*let imageDataSaved = await updateLeafletPhotos(req, res, formattedExifData);*/

    //cc(imageDataSaved)
    res.status(200).send(standardizedResponse("Updated Leaflet"));
}

/*
if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error*/
