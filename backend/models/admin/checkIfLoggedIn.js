const {standardizedResponse} = require("../../utils/fns");
const {cc} = require("../../common/variables");

exports.adminIsLoggedIn = ((req, res) => {
    if (req.session.admin !== true){
        return false;
    }
    return true;
});