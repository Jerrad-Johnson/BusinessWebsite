const {cc, ct, galleryTableNameSm, galleryTableNameLg, galleryTableNameTiny} = require("../../common/variables");
const {genericSQLPromise} = require("../../common/queries");
const {standardizedResponse} = require("../../utils/fns");

exports.getThisFolderOfImages = async (req, res, next) => {
    let galleryByImageSize;

    if (req.body.gallerySize === "sm"){
        galleryByImageSize = galleryTableNameSm;
    } else if (req.body.gallerySize === "lg"){
        galleryByImageSize = galleryTableNameLg;
    } else if (req.body.gallerySize === "tiny"){
        galleryByImageSize = galleryTableNameTiny;
    }

    try{
        let results = await genericSQLPromise(`SELECT * FROM ${galleryByImageSize} WHERE folder = ?`, [req.body.galleryName]);
        res.status(200).send(standardizedResponse("Image data loaded.", results));

    } catch (e) {
        ct(e);
        res.status(500).send(standardizedResponse("Error getting gallery image data."));
    }

}