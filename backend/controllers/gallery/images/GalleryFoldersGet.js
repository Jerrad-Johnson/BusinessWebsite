const {cc, ct} = require("../../../common/variables");
const {genericSQLPromise} = require("../../../common/queries");
const {standardizedResponse} = require("../../../utils/fns");

exports.GalleryFoldersGet = async (req, res, next) => {
    try{
        const results = await genericSQLPromise(`SELECT DISTINCT folder FROM gallery_sm_images`);
        res.status(200).send(standardizedResponse("Success.", results));
    } catch (e) {
        ct(e);
        res.status(500).send("Error.");
    }
}