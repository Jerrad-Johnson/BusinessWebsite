const {genericSQLPromise} = require("../../../common/queries");
const mysql = require("mysql");
const {standardizedResponse} = require("../../../utils/fns");

exports.saveImageDataToDB = async (req, res, files) => {
    const deleteAllQuery = "DELETE FROM leaflet_images;";
    try{
        await genericSQLPromise(deleteAllQuery, [], res);
    } catch (e) {
        cc(e);
        res.status(500).send(standardizedResponse("SQL Error", e));
        return;
    }

    const insertQuery = "INSERT INTO leaflet_images(folder, file_name, file_name_full, alt_text, camera_model, lens_model, focal_length, exposure_time, iso, photo_capture, lat_lon, altitude) VALUES (?);";

    for (folder in files){
        for (file of files[folder]){
            file = JSON.parse(file);

            try{
                let lon = file.GPSLongitude.slice(0, -2);
                let lat = file.GPSLatitude.slice(0, -2);
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
    res.status(200).send(standardizedResponse("Updated Leaflet"));

}