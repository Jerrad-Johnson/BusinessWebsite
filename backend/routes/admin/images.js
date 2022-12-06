const express = require('express');
const {ImagesControllerPost} = require("../../controllers/admin/images/ImagesControllerPost");
const router = express.Router();
const cc = console.log;

router.get('/', (res, req, next) => {
    next();
});

router.post('/updateAllImages', ImagesControllerPost); //TODO Change to PUT

module.exports = router;
