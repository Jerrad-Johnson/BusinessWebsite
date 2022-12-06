const {standardizedResponse} = require("../../utils/fns");
const {genericSQLPromise} = require("../../common/queries");
const bcrypt = require('../../common/custom-bcrypt');



exports.AdminLoginController = async (req, res, next) => {
    let query = "SELECT password FROM admin_account WHERE username = ?";
    let queryResult = await genericSQLPromise(query, [req.body.username], res);
    let comparison = bcrypt.compare(req.body.password, queryResult.data[0].password);
    //res.status(200).send(standardizedResponse(hashed));
}