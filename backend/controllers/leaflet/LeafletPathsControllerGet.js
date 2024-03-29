const {getDataForLeaflet} = require("../../models/leaflet/getDataForLeaflet");
const {standardizedResponse} = require("../../utils/fns");
const {ct} = require("../../common/variables");

exports.LeafletImagePathsControllerGet = async (req, res, next) => {
    try {
        results = await getDataForLeaflet(req, res, next);
    } catch (e) {
        ct(e);
        res.status(500).send(standardizedResponse("MySQL Error", e))
        return;
    }

    res.status(200).send(standardizedResponse("Paths loaded.", results));
}
