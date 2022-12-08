var express = require('express');
var router = express.Router();
const imagesRouter = require('./images');
const {AdminLoginController} = require("../../controllers/admin/AdminLoginControllerPost");

router.use('/images', imagesRouter);
router.post('/login', AdminLoginController)

module.exports = router;
