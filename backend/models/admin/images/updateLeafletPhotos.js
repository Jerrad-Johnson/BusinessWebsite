const {genericSQLPromise} = require("../../../common/queries");
const mysql = require("mysql");
const {standardizedResponse} = require("../../../utils/fns");



exports.updateLeafletPhotos = async (req, res, files) => {
    const deleteAllQuery = "DELETE FROM leaflet_images;";
    try{
        await genericSQLPromise(deleteAllQuery, [], res);
    } catch (e) {
        cc(e);
        res.status(500).send(standardizedResponse("SQL Error", e));
        return;
    }

    const insertQuery = `INSERT INTO leaflet_images(folder, file_name, file_name_full, alt_text, camera_model,
        lens_model, focal_length, exposure_time, iso, photo_capture, lat_lon, altitude) VALUES (?)`;

    for (folder in files){
        for (file of files[folder]){
            file = JSON.parse(file);
            let lon = setDirectionLatLon(file.GPSLongitude);
            let lat = setDirectionLatLon(file.GPSLatitude);

            try {
                let RAW_POINT = mysql.raw(`ST_GeomFromText("POINT(${lon} ${lat})")`);

                await genericSQLPromise(insertQuery, [[folder, file.FileName,
                    file.FileNameFull, file.AltText, file.CameraModel, file.LensModel, file.FocalLength,
                    file.ExposureTime, file.ISOSpeedRatings, file.DateTimeCreated, RAW_POINT, file.GPSAltitude]], res);
            } catch (e) {
                cc(e);
                res.status(500).send(standardizedResponse("SQL Error", e));
                return;
            }
        }
    }

}

function setDirectionLatLon(coordinate){
    let decoupledCoordinate = JSON.parse(JSON.stringify(coordinate));
    if (decoupledCoordinate.slice(-1) === "W") return -decoupledCoordinate.slice(0, -2);
    if (decoupledCoordinate.slice(-1) === "S") return -decoupledCoordinate.slice(0, -2);
    return +decoupledCoordinate.slice(0, -2);
}