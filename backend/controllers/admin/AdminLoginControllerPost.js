const {standardizedResponse} = require("../../utils/fns");
const {genericSQLPromise} = require("../../common/queries");
const bcrypt = require('../../common/custom-bcrypt');



exports.AdminLoginController = async (req, res, next) => {
    let query = "SELECT password FROM admin_account WHERE username = ?";
    let queryResult = await genericSQLPromise(query, [req.body.username], res);
    let hashed = bcrypt.hash(queryResult.data[0].password)
    cc(hashed);
    //cc(queryResult);
    res.status(200).send(standardizedResponse(hashed));
}