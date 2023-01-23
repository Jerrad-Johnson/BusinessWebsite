const {genericSQLPromise} = require("../../../common/queries");
const {standardizedResponse} = require("../../../utils/fns");
const {cc, errorExistsNotInScript, errorExistsInScript} = require("../../../common/variables");
const mysql = require("mysql");

exports.updateLeafletPhotosTable = async (req, res, files) => {
    //cc(files.tinyImgsExif);
/*    const deleteAllQuery = "DELETE FROM leaflet_images;";
    let scriptDidError = errorExistsNotInScript;

    try{
        await genericSQLPromise(deleteAllQuery, [], res);
    } catch (e) {
        cc(e);
        scriptDidError = errorExistsInScript
        res.status(500).send(standardizedResponse("SQL Error", e));
    }
    if (scriptDidError) return errorExistsInScript;

    const insertQuery = `INSERT INTO leaflet_images(url, folder, file_name, file_name_full, alt_text, camera_model,
        lens_model, focal_length, exposure_time, iso, photo_capture, width, height, lat_lon, altitude) VALUES (?)`;


    for (folder in files){
        for (file of files[folder]){
            file = JSON.parse(file);
            let lon = setDirectionLatLon(file.GPSLongitude);
            let lat = setDirectionLatLon(file.GPSLatitude);

            try {
                let RAW_POINT = mysql.raw(`ST_GeomFromText("POINT(${lon} ${lat})")`);

                await genericSQLPromise(insertQuery, [[file.URL, folder, file.FileName,
                    file.FileNameFull, file.AltText, file.CameraModel, file.LensModel, file.FocalLength,
                    file.ExposureTime, file.ISOSpeedRatings, file.DateTimeCreated, file.width, file.height,
                    RAW_POINT, file.GPSAltitude]], res);
            } catch (e) {
                cc(e);
                scriptDidError = errorExistsInScript;
                res.status(500).send(standardizedResponse("SQL Error", e));
            }
        }
    }
    if (scriptDidError) return errorExistsInScript;

    return errorExistsNotInScript;*/

}

function setDirectionLatLon(coordinate){
    let decoupledCoordinate = JSON.parse(JSON.stringify(coordinate));
    if (decoupledCoordinate.slice(-1) === "W") return -decoupledCoordinate.slice(0, -2);
    if (decoupledCoordinate.slice(-1) === "S") return -decoupledCoordinate.slice(0, -2);
    return +decoupledCoordinate.slice(0, -2);
}