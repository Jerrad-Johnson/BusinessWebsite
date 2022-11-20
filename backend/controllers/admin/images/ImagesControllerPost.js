const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate"); cc = console.log;

exports.ImagesControllerPost = async (req, res, next) => {
    let filenames = [];
    filenames = await getFilenamesForMapUpdate(req);
    if (!(filenames.length > 0)) next(); //TODO Handle error

    let rawExifData = await getExifForMapUpdate(req, filenames);
    if (!rawExifData) next(); //TODO Handle error

    let formattedExifData = await formatExifForMapUpdate(req, rawExifData);
    cc(formattedExifData); //TODO Handle error
}