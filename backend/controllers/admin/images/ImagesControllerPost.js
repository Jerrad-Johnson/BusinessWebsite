const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn"); cc = console.log;

exports.ImagesControllerPost = async (req, res, next) => {
    if (!adminIsLoggedIn(req, res)) return;

    let filenames = [];
    filenames = await getFilenamesForMapUpdate(req);
    if (!(filenames.length > 0)) next(); //TODO Handle error

    let rawExifData = await getExifForMapUpdate(req, filenames);
    if (!rawExifData) next(); //TODO Handle error

    let formattedExifData = await formatExifForMapUpdate(req, rawExifData);
    cc(formattedExifData); //TODO Handle error
}