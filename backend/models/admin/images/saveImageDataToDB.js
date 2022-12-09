const {genericSQLPromise} = require("../../../common/queries");
exports.saveImageDataToDB = async (req, res, files) => {
    const deleteAllQuery = "DELETE FROM leaflet_images;";
    const deleteResult = await genericSQLPromise(deleteAllQuery, [], res);

    const insertQuery = "INSERT INTO leaflet_images(folder, file_name, file_name_full, alt_text, camera_model, lens_model, focal_length, exposure_time, iso, photo_capture, lat_lon, altitude) VALUES (?);";

    outer:
    for (folder in files){
        let folderName = folder
        for (file of files[folder]){
            file = JSON.parse(file);
            try{
                let lon = file.GPSLongitude.slice(0, -2);
                let lat = file.GPSLatitude.slice(0, -2);
                let insertResult = await genericSQLPromise(insertQuery, [[folderName, file.FileName,
                    file.FileNameFull, file.AltText, file.CameraModel, file.LensModel,
                    file.FocalLength, file.ExposureTime, file.ISOSpeedRatings,
                    file.DateTimeCreated, `POINT(${lon}, ${lat})`,
                    file.GPSAltitude]], res) ;
            } catch (e) {
                cc(e);
                break outer;
            }
        }
    }

}