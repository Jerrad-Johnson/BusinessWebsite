const {standardizedResponse} = require("../../utils/fns");

exports.adminIsLoggedIn = ((req, res) => {
    if (req.session.admin !== true){
        res.status(401).send(standardizedResponse("Not logged in."));
        return false;
    }
    return true;
});