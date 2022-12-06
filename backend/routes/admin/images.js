const express = require('express');
const {ImagesControllerPost} = require("../../controllers/admin/images/ImagesControllerPost");
const router = express.Router();
const cc = console.log;

router.get('/', (res, req, next) => {
    next();
});

router.put('/updateAllImages', ImagesControllerPost); //TODO Change to POST

module.exports = router;
