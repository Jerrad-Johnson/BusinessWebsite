const {businessName, errorExistsInScript, cc, pathToLeafletThumbnailsForExifReader, ct} = require("../../../common/variables");
exports.formatExifForMapUpdate = async (allExifData) => {
    let {largeImgsExif, smallImgsExif, tinyImgsExif} = {...allExifData};

    largeImgsExif = format(largeImgsExif);
    smallImgsExif = format(smallImgsExif);
    tinyImgsExif = format(tinyImgsExif);

    return {largeImgsExif, smallImgsExif, tinyImgsExif};
}

function reformatFilenameAndGetAltText(file, folder){
    let filenameSplit = file.split("-");
    let filenameAndAlt = {};

    if (filenameSplit[1]){
        filenameAndAlt.altText = filenameSplit[1];
        filenameAndAlt.fileName = `${filenameSplit[0]}${filenameSplit[2]}`;
    } else {
        filenameAndAlt.altText = `${folder} photograph by ${businessName}.`;
        filenameAndAlt.fileName = file;
    }
    return [filenameAndAlt.altText, filenameAndAlt.fileName];
}

function reformatDateAndTime(file){
    let timeCreated = file.DateCreated.value.slice(11, 19)
    let hourToShift = +timeCreated.slice(0, 2);
    let originalTZ = file.OffsetTimeOriginal.description.slice(0, 3);
    let newTZ = file.OffsetTime.description.slice(0, 3);
    let tzDifference = eval(newTZ - originalTZ); // NOTE: My users have no way of causing any text to end up here; eval is safe.
    let hourShifted = hourToShift + tzDifference;
    let newTimeCreated = hourShifted + timeCreated.slice(2);
    let dateCreated = file.DateCreated.value.slice(0, 10);

    return [newTimeCreated, dateCreated];
}


function format(exifData){
    let exifObject = {};
    let formattedExifData = {};
    let exifAsString = "";

    try {
        for (let folder in exifData){
            formattedExifData[folder] = [];

            for (let file of exifData[folder]){
                [exifObject.AltText, exifObject.FileName] = reformatFilenameAndGetAltText(file.fileName, folder);
                [exifObject.TimeCreated, exifObject.DateCreated] = reformatDateAndTime(file);
                exifObject.DateTimeCreated = file.DateCreated.value.slice(0, -6) + file.OffsetTime.description;

                exifObject.FolderName = folder;
                exifObject.FileNameFull = file.fileName;
                exifObject.LensModel = file.LensModel.value;
                exifObject.CameraModel = file.Model.description;
                exifObject.FocalLength = file.FocalLength.description.split(" ").join("");
                exifObject.ExposureTime = file.ExposureTime.description;
                exifObject.ApertureValue = file.ApertureValue.description;
                exifObject.ISOSpeedRatings = file.ISOSpeedRatings.value;
                exifObject.GPSLatitude = (file.GPSLatitude.description + " " + file.GPSLatitudeRef.value[0]);
                exifObject.GPSLongitude = (file.GPSLongitude.description + " " + file.GPSLongitudeRef.value[0]);
                exifObject.GPSAltitude = Math.trunc(file.GPSAltitude.value[0] / 10000 * 3.28084);
                exifObject.URL = `${pathToLeafletThumbnailsForExifReader}/${folder}/${file.fileName}`;
                exifObject.width = file['Image Width'].value;
                exifObject.height = file['Image Height'].value

                exifAsString = JSON.stringify(exifObject);
                formattedExifData[folder].push(exifAsString);

                //TODO Convert DataCreated

                for (let prop of Object.getOwnPropertyNames(exifObject)) {
                    delete exifObject[prop];
                }

                let captureDate = new Date(file.DateCreated.value);
                let captureDateToUTC = captureDate.toUTCString();
            }
        }
    } catch (e) {
        ct(e);
        return errorExistsInScript;
    }

    return formattedExifData;
}


/*

CREATE TABLE gallery_std_thumbnails (
    id INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
    folder VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_name_full VARCHAR(255) NOT NULL,
    alt_text VARCHAR(510) NOT NULL,
    camera_model VARCHAR(255),
    lens_model VARCHAR(255),
    focal_length VARCHAR(255),
    exposure_time VARCHAR(255),
    iso SMALLINT,
    photo_capture DATETIME,
    lat_lon POINT NOT NULL,
    altitude MEDIUMINT NOT NULL,
    SPATIAL INDEX (lat_lon)
);




 SPATIAL KEY
gps_latitude VARCHAR(255) NOT NULL,
gps_longitude VARCHAR(255) NOT NULL,*/
