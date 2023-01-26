const {genericSQLPromise} = require("../../common/queries");
const mysql = require("mysql");
const {cc} = require("../../common/variables");
const {standardizedResponse} = require("../../utils/fns");

exports.getDataForLeaflet = async (req, res, next) => {
    const LONGITUDE_RAW = mysql.raw(`ST_X(gallery_geo_data.lat_lon)`);
    const LATITUDE_RAW = mysql.raw(`ST_Y(gallery_geo_data.lat_lon)`);
    //const query = "SELECT url, width, height, file_name, alt_text, camera_model, lens_model, photo_capture, folder, file_name_full, folder, (?) AS longitude, (?) AS latitude FROM gallery_sm_images;";

    const query = `SELECT gallery_lg_images.url, gallery_lg_images.width, gallery_lg_images.height, gallery_lg_images.file_name, gallery_lg_images.alt_text, gallery_lg_images.camera_model, 
        gallery_lg_images.lens_model, gallery_lg_images.photo_capture, gallery_lg_images.folder, gallery_lg_images.file_name_full, (?) AS longitude, (?) AS latitude FROM gallery_lg_images 
        INNER JOIN gallery_geo_data ON gallery_lg_images.file_name=gallery_geo_data.file_name AND gallery_lg_images.folder=gallery_geo_data.folder`;

    const results = await genericSQLPromise(query, [LONGITUDE_RAW, LATITUDE_RAW], res);
    let resultsCorrected = {...results}

    if (resultsCorrected.data.length < 1){
        res.status(200).send(standardizedResponse("No results."));
        return;
    }
    for (let i = 0; i < resultsCorrected.data.length; i++){
        resultsCorrected.data[i].width = +resultsCorrected.data[i].width;
        resultsCorrected.data[i].height = +resultsCorrected.data[i].height;
    }

    return resultsCorrected;
}
