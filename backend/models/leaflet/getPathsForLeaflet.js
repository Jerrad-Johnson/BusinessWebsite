const {genericSQLPromise} = require("../../common/queries");

exports.getPathsForLeaflet = async (req, res, next) => {
    const query = "SELECT file_name_full, folder FROM leaflet_images;";
    return await genericSQLPromise(query, [], res);
}
