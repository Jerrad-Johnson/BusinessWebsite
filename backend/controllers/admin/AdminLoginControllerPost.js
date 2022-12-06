const {standardizedResponse} = require("../../utils/fns");
const {genericSQLPromise} = require("../../common/queries");



exports.AdminLoginController = async (req, res, next) => {
    let query = "SELECT password FROM admin_account WHERE username = ?";
    let queryResult = await genericSQLPromise(query, [req.body.username], res);

    cc(queryResult);
    //cc(queryResult);
    //res.status(200).send(standardizedResponse("test", {something: "sommewhere"}));
}