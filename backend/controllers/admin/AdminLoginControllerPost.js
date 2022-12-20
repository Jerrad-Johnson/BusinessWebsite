const {standardizedResponse} = require("../../utils/fns");
const {genericSQLPromise} = require("../../common/queries");
const bcrypt = require('../../common/custom-bcrypt');
const {cc} = require("../../common/variables");

exports.AdminLoginController = async (req, res, next) => { // TODO Split into Models.
    if (req.body.username === undefined || req.body.password === undefined || req.body.username === "" || req.body.password === ""){
        res.status(200).send(standardizedResponse("Must enter both username and password", {loggedIn: false}));
        return;
    }

    let query = "SELECT password FROM admin_account WHERE username = ?";
    let queryResult = await genericSQLPromise(query, [req.body.username], res);
    if (queryResult?.data[0]?.password === undefined){
        res.status(200).send(standardizedResponse("Username or password not found.", {loggedIn: false}));
        return;
    }

    let comparison = bcrypt.compare(req.body?.password, queryResult?.data[0]?.password);
    //cc(bcrypt.hash('', 10)); For re-creating admin password; add to UI later.

    if (comparison === true){
        req.session.admin = true;
        res.status(200).send(standardizedResponse("Logged in", {loggedIn: true}));
    } else {
        res.status(200).send(standardizedResponse("Invalid username or password.", {loggedIn: false}));
    }
}