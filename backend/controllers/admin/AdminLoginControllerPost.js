const {standardizedResponse} = require("../../common/standardizedResponse");

exports.AdminLoginController = async (req, res, next) => {

    res.status(200).send(standardizedResponse("test", {something: "sommewhere"}));
}