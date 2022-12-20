const {standardizedResponse} = require("../../utils/fns");

exports.adminIsLoggedIn = ((req, res) => {
    if (req.session.admin !== true){
        return false;
    }
    return true;
});