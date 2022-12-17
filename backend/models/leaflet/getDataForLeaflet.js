const {genericSQLPromise} = require("../../common/queries");
const mysql = require("mysql");

exports.getDataForLeaflet = async (req, res, next) => {
    const LONGITUDE_RAW = mysql.raw(`ST_X(lat_lon)`);
    const LATITUDE_RAW = mysql.raw(`ST_Y(lat_lon)`);
    const query = "SELECT file_name_full, folder, (?) AS longitude, (?) AS latitude FROM leaflet_images;";
    return await genericSQLPromise(query, [LONGITUDE_RAW, LATITUDE_RAW], res);
}