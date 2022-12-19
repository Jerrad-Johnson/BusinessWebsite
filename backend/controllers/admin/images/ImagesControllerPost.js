const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate");
const {updateLeafletPhotos} = require("../../../models/admin/images/updateLeafletPhotos");
const {standardizedResponse} = require("../../../utils/fns");
const {createLeafletThumbnails} = require("../../../models/admin/images/createLeafletThumbnails");
cc = console.log;

exports.ImagesControllerPost = async (req, res, next) => {
    //if (!adminIsLoggedIn(req, res)) return;

    let foldernames = await getFoldernamesForMapUpdate();
    let createThumbnailResult = await createLeafletThumbnails(foldernames);
    /*let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    let formattedExifData = await formatExifForMapUpdate(rawExifData);
    let imageDataSaved = await updateLeafletPhotos(req, res, formattedExifData);*/

    //cc(imageDataSaved)
    res.status(200).send(standardizedResponse("Updated Leaflet"));
}

/*
if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error*/
