const {genericSQLPromise} = require("../../common/queries");
const mysql = require("mysql");
const {cc} = require("../../common/variables");

exports.getDataForLeaflet = async (req, res, next) => {
    const LONGITUDE_RAW = mysql.raw(`ST_X(lat_lon)`);
    const LATITUDE_RAW = mysql.raw(`ST_Y(lat_lon)`);
    const query = "SELECT url, width, height, file_name, alt_text, camera_model, lens_model, photo_capture, folder, file_name_full, folder, (?) AS longitude, (?) AS latitude FROM gallery_sm_images;";
    const results = await genericSQLPromise(query, [LONGITUDE_RAW, LATITUDE_RAW], res);
    let resultsCorrected = {...results}
    for (let i = 0; i < resultsCorrected.data.length; i++){
        resultsCorrected.data[i].width = +resultsCorrected.data[i].width;
        resultsCorrected.data[i].height = +resultsCorrected.data[i].height;
    }

    return resultsCorrected;
}
