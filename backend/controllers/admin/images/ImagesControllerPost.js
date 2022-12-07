const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate"); cc = console.log;

exports.ImagesControllerPost = async (req, res, next) => {
    //if (!adminIsLoggedIn(req, res)) return;

    let foldernames = await getFoldernamesForMapUpdate();
    let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    let formattedExifData = await formatExifForMapUpdate(rawExifData);
    cc(formattedExifData);
//    cc(formattedExifData); //TODO Handle error
}

/*
if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error*/
