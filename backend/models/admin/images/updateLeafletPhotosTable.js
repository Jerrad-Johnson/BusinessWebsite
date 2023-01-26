const {genericSQLPromise} = require("../../../common/queries");
const {standardizedResponse} = require("../../../utils/fns");
const {cc, errorExistsNotInScript, errorExistsInScript, ct} = require("../../../common/variables");
const mysql = require("mysql");
const path = require("path");

exports.updateLeafletPhotosTable = async (req, res, files) => {
    const deleteAllQueries = ["DELETE FROM gallery_lg_images;", "DELETE FROM gallery_sm_images;", "DELETE FROM gallery_tiny_images;"]
    const insertQueries = []

    try{
        await deleteOldTableData(deleteAllQueries, res);
    } catch (e) {
        ct(e);
        throw new Error(e);
    }

    const insertData = [{
        query: `INSERT INTO gallery_lg_images(url, base64url, folder, file_name, file_name_full, alt_text, camera_model, lens_model, 
            focal_length, exposure_time, iso, photo_capture, width, height) VALUES (?);`,
        files: files.largeImgsExif,

        }, {
        query: `INSERT INTO gallery_sm_images(url, base64url, folder, file_name, file_name_full, alt_text, camera_model, lens_model, 
            focal_length, exposure_time, iso, photo_capture, width, height) VALUES (?);`,
        files: files.smallImgsExif,
        }, {
        query: `INSERT INTO gallery_tiny_images(url, base64url, folder, file_name, file_name_full, alt_text, camera_model, lens_model, 
            focal_length, exposure_time, iso, photo_capture, width, height) VALUES (?);`,
        files: files.tinyImgsExif,
        },
    ];

    for (set of insertData){
        for (folder in set.files){
            for (file of set.files[folder]){
                file = JSON.parse(file);
                try {
                    await genericSQLPromise(set.query, [[file.URL, file.base64url, folder, file.FileName,
                        file.FileNameFull, file.AltText, file.CameraModel, file.LensModel, file.FocalLength,
                        file.ExposureTime, file.ISOSpeedRatings, file.DateTimeCreated, file.width, file.height
                        ]], res);
                } catch (e) {
                    ct(e);
                    res.status(500).send(standardizedResponse("SQL Error", e));
                    throw new Error(e);
                }
            }
        }
    }

    const insertGeoData = {
        query: `INSERT INTO gallery_geo_data(folder, file_name, lat_lon, altitude) VALUES (?);`,
        files: files.largeImgsExif,
    }

    try {
        for (folder in insertGeoData.files) {
            for (file of insertGeoData.files[folder]) {
                file = JSON.parse(file);
                if (file.GPSLongitude === null) continue;
                let lon = setDirectionLatLon(file.GPSLongitude);
                let lat = setDirectionLatLon(file.GPSLatitude);
                let RAW_POINT = mysql.raw(`ST_GeomFromText("POINT(${lon} ${lat})")`);
                await genericSQLPromise(insertGeoData.query, [[folder, file.FileName, RAW_POINT, file.GPSAltitude]])
            }
        }
    } catch (e) {
        ct(e);
        res.status(500).send(standardizedResponse("SQL Error", e));
        throw new Error(e);
    }


}

async function deleteOldTableData(queries, res){
    try{
        for (query of queries) await genericSQLPromise(query, [], res);
    } catch (e) {
        res.status(500).send(standardizedResponse("SQL Error", e));
        throw new Error(e);
    }

}

function setDirectionLatLon(coordinate){
    let decoupledCoordinate = JSON.parse(JSON.stringify(coordinate));
    if (decoupledCoordinate.slice(-1) === "W") return -decoupledCoordinate.slice(0, -2);
    if (decoupledCoordinate.slice(-1) === "S") return -decoupledCoordinate.slice(0, -2);
    return +decoupledCoordinate.slice(0, -2);
}

