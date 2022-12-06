const {standardizedResponse} = require("../../utils/fns");
const {genericSQLPromise} = require("../../common/queries");

exports.AdminLoginController = async (req, res, next) => {
    let query = "SELECT username FROM admin_account WHERE username = ? AND password = ?";
    cc(req.body.password);
    let queryResult = genericSQLPromise(query, [req.body.username, req.body.password], res);
    //cc(queryResult);
    //res.status(200).send(standardizedResponse("test", {something: "sommewhere"}));
}