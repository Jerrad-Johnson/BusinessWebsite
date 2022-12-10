const {getPathsForLeaflet} = require("../../models/leaflet/getPathsForLeaflet");
const {standardizedResponse} = require("../../utils/fns");

exports.LeafletImagePathsControllerGet = async (req, res, next) => {
    try {
        results = await getPathsForLeaflet(req, res, next);
    } catch (e) {
        cc(e);
        res.status(500).send(standardizedResponse("MySQL Error", e))
        return;
    }

    res.status(200).send(standardizedResponse("Paths loaded.", results));
}
