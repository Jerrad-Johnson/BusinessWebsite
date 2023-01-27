const {getFilenamesForMapUpdate} = require("../../../models/admin/images/getFilenamesForMapUpdate");
const {getExifForMapUpdate} = require("../../../models/admin/images/getExifForMapUpdate");
const {formatExifForMapUpdate} = require("../../../models/admin/images/formatExifDataForMapUpdate");
const {adminIsLoggedIn} = require("../../../models/admin/checkIfLoggedIn");
const {getFoldernamesForMapUpdate} = require("../../../models/admin/images/getFoldernamesForMapUpdate");
const {updateLeafletPhotosTable} = require("../../../models/admin/images/updateLeafletPhotosTable");
const {standardizedResponse} = require("../../../utils/fns");
const {resizeGalleryImages} = require("../../../models/admin/images/resizeGalleryImages");
const {errorExistsInScript, cc, fitMethods, resizeResolutions, pathTo1920pxPhotos} = require("../../../common/variables");


exports.ImagesControllerPost = async (req, res, next) => {
/*    if (!adminIsLoggedIn(req, res)) {
        res.status(403).send(standardizedResponse("User is not logged in as Admin."));
        return;
    }*/

    cc(5)

    let foldernames = await getFoldernamesForMapUpdate();
    if (foldernames === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to find image folders."));
        return;
    }

    let fileAndFolderNames =  await getFilenamesForMapUpdate(foldernames);
    if (fileAndFolderNames === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to get filenames for map update."));
        return;
    }

    let createImagesResult = await resizeGalleryImages(fileAndFolderNames, pathTo1920pxPhotos, resizeResolutions.large, fitMethods.inside);
    if (createImagesResult === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to create large images."));
        return;
    }

    let rawExifData = await getExifForMapUpdate(fileAndFolderNames);
    if (rawExifData === errorExistsInScript){
        res.status(500).send(standardizedResponse("Failed to get exif data from images."));
        return;
    }

    let formattedExifData = await formatExifForMapUpdate(rawExifData);
    if (formattedExifData === errorExistsInScript) {
        res.status(500).send(standardizedResponse("Failed to reformat image exif data."));
        return;
    }

    let imageDataSaved = await updateLeafletPhotosTable(req, res, formattedExifData);
    if (imageDataSaved === errorExistsInScript) return;

    res.status(200).send(standardizedResponse("Updated Leaflet"));
}


/*NN

if (!(filenames.length > 0)) next(); //TODO Handle error
if (!rawExifData) next(); //TODO Handle error
*/
