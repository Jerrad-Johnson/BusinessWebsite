exports.formatExifForMapUpdate = async (exifData) => {
    let exifObject = {};
    let formattedExifData = [];
    let exifAsString = "";

    for (let entry of exifData) {
        exifObject.LensModel = entry.LensModel.value;
        exifObject.fileName = entry.fileName;
        exifObject.LensModel = entry.LensModel.value;
        exifObject.FocalLength = entry.LensModel.value;
        exifObject.DateCreated = entry.DateCreated.value;
        exifObject.ExposureTime = entry.DateCreated.value;
        exifObject.FNumber = entry.FNumber.value;
        exifObject.ISOSpeedRatings = entry.ISOSpeedRatings.value;
        exifObject.OffsetTime = entry.OffsetTime.value;
        exifObject.OffsetTimeOriginal = entry.OffsetTimeOriginal.value;
        exifObject.GPSLatitude = (entry.GPSLatitude.description + " " + entry.GPSLatitudeRef.value[0]);
        exifObject.GPSLongitude = (entry.GPSLongitude.description + " " + entry.GPSLongitudeRef.value[0]);
        exifObject.GPSAltitude = Math.trunc(entry.GPSAltitude.value[0] / 10000 * 3.28084);

        exifAsString = JSON.stringify(exifObject);
        formattedExifData.push(exifAsString);

        for (const prop of Object.getOwnPropertyNames(exifObject)) {
            delete exifObject[prop];
        }
    }

    return formattedExifData;
}