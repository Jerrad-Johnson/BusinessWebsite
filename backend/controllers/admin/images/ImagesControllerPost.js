const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate");
const {saveImageDataToDB} = require("../../../models/admin/images/saveImageDataToDB"); cc = console.log;

exports.ImagesControllerPost = async (req, res, next) => {
    //if (!adminIsLoggedIn(req, res)) return;

    let foldernames = await getFoldernamesForMapUpdate();
    let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    let formattedExifData = await formatExifForMapUpdate(rawExifData);
    let imageDataSaved = await saveImageDataToDB(req, res, formattedExifData);
}

/*
if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error*/
