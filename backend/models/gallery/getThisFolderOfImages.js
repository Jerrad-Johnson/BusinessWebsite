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
        let results = await genericSQLPromise(`
            SELECT ${galleryByImageSize}.*, gallery_lg_images.url AS 'lg_img_url' 
            FROM ${galleryByImageSize} 
            JOIN gallery_lg_images
            WHERE gallery_sm_images.folder = ? 
            AND gallery_lg_images.folder = ?
            AND ${galleryByImageSize}.file_name = gallery_lg_images.file_name`,
            [[req.body.galleryName], [req.body.galleryName]]);

        res.status(200).send(standardizedResponse("Image data loaded.", results));

    } catch (e) {
        ct(e);
        res.status(500).send(standardizedResponse("Error getting gallery image data."));
    }

}