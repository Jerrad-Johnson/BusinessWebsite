const {businessName} = require("../../../common/variables");
exports.formatExifForMapUpdate = async (exifData) => {
    let exifObject = {};
    let formattedExifData = {};
    let exifAsString = "";

    for (let folder in exifData) {
        formattedExifData[folder] = [];
        let filenameSplit = [];

        for (let file of exifData[folder]){
            filenameSplit = file.fileName.split("-");
            if (filenameSplit[1]){
                exifObject.altText = filenameSplit[1];
                exifObject.fileName = `${filenameSplit[0]}${filenameSplit[2]}`;
            } else {
                exifObject.altText = `${folder} photograph by ${businessName}.`;
                exifObject.fileName = file.fileName;
            }

            filenameSplit = [];
            exifObject.LensModel = file.LensModel.value;
            exifObject.LensModel = file.LensModel.value;
            exifObject.FocalLength = file.LensModel.value;
            exifObject.DateCreated = file.DateCreated.value;
            exifObject.ExposureTime = file.DateCreated.value;
            exifObject.FNumber = file.FNumber.value;
            exifObject.ISOSpeedRatings = file.ISOSpeedRatings.value;
            exifObject.OffsetTime = file.OffsetTime.value;
            exifObject.OffsetTimeOriginal = file.OffsetTimeOriginal.value;
            exifObject.GPSLatitude = (file.GPSLatitude.description + " " + file.GPSLatitudeRef.value[0]);
            exifObject.GPSLongitude = (file.GPSLongitude.description + " " + file.GPSLongitudeRef.value[0]);
            exifObject.GPSAltitude = Math.trunc(file.GPSAltitude.value[0] / 10000 * 3.28084);
            exifObject.folderName = folder;

            exifAsString = JSON.stringify(exifObject);
            formattedExifData[folder].push(exifAsString);

            //TODO Convert DataCreated

            for (const prop of Object.getOwnPropertyNames(exifObject)) {
                delete exifObject[prop];
            }
        }
    }

    return formattedExifData;
}