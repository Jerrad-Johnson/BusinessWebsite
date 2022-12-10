var express = require('express');
const {LeafletImagePathsControllerGet} = require("../../controllers/leaflet/LeafletImagePathsControllerGet");
var router = express.Router();

router.get('/', (req, res, next) => {
    cc(5);
   // res.status(200).send();
});

router.get('/getImagePaths', LeafletImagePathsControllerGet);

module.exports = router;