const {businessName, errorExistsInScript, cc, ct, publicPathToLgImgs, publicPathToSmImgs, publicPathToTinyImgs,
    publicPathToBase64Imgs
} = require("../../../common/variables");
exports.formatExifForMapUpdate = async (allExifData) => {
    let {largeImgsExif, smallImgsExif, tinyImgsExif} = {...allExifData};

    largeImgsExif = format(largeImgsExif, publicPathToLgImgs);
    smallImgsExif = format(smallImgsExif, publicPathToSmImgs);
    tinyImgsExif = format(tinyImgsExif,  publicPathToTinyImgs);

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
    let originalTZ = file.OffsetTimeOriginal?.description?.slice(0, 3) || 0;
    let newTZ = file.OffsetTime?.description?.slice(0, 3) || 0;
    let tzDifference = eval(newTZ - originalTZ); // NOTE: My users have no way of causing any text to end up here; eval is safe.
    let hourShifted = hourToShift + tzDifference;
    let newTimeCreated = hourShifted + timeCreated.slice(2);
    let dateCreated = file.DateCreated.value.slice(0, 10);

    return [newTimeCreated, dateCreated];
}


function format(exifData, url){

    let exifObject = {};
    let formattedExifData = {};
    let exifAsString = "";

    try {
        for (let folder in exifData){
            formattedExifData[folder] = [];


            for (let file of exifData[folder]){

                [exifObject.AltText, exifObject.FileName] = reformatFilenameAndGetAltText(file.fileName, folder);
                [exifObject.TimeCreated, exifObject.DateCreated] = reformatDateAndTime(file);
                exifObject.DateTimeCreated = `${exifObject.DateCreated}T${exifObject.TimeCreated}.00${file.OffsetTime.description}`;
                exifObject.FolderName = folder;
                exifObject.FileNameFull = file.fileName;
                exifObject.LensModel = file.LensModel.value;
                exifObject.CameraModel = file.Model.description;
                exifObject.FocalLength = file.FocalLength.description.split(" ").join("");
                exifObject.ExposureTime = file.ExposureTime.description;
                exifObject.ApertureValue = file.ApertureValue.description;
                exifObject.ISOSpeedRatings = file.ISOSpeedRatings.value;
                if (file.GPSLatitude?.description){
                    exifObject.GPSLatitude = (file.GPSLatitude?.description + " " + file.GPSLatitudeRef?.value[0])
                    exifObject.GPSLongitude = (file.GPSLongitude?.description + " " + file.GPSLongitudeRef?.value[0]);
                } else {
                    exifObject.GPSLatitude = null;
                    exifObject.GPSLongitude = null;
                }
                exifObject.GPSAltitude = Math.trunc(file.GPSAltitude?.value?.[0] / 10000 * 3.28084) || null;
                exifObject.URL = `${url}/${folder}/${file.fileName}`;
                exifObject.base64url = `${publicPathToBase64Imgs}/${folder}/${file.fileName}`;
                exifObject.width = file['Image Width'].value;
                exifObject.height = file['Image Height'].value;


                exifAsString = JSON.stringify(exifObject);
                formattedExifData[folder].push(exifAsString);

                //TODO Convert DataCreated

                for (let prop of Object.getOwnPropertyNames(exifObject)) {
                    delete exifObject[prop];
                }

                /*let captureDate = new Date(file.DateCreated.value);
                let captureDateToUTC = captureDate.toUTCString();*/
            }
        }
    } catch (e) {
        ct(e);
        return errorExistsInScript;
    }

    return formattedExifData;
}