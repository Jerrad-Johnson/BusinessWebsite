exports.genericError = (res, message = "", data = {}, customStatus = 500) => {
    res.status(customStatus).send({
        "data": data,
        "message": message,
    });
}

exports.genericSQLErrorCheck = (res, err) => {
    if (err !== null){
        genericError(res, err.sqlMessage);
        return true;
    }
    return false;
}

exports.checkLogin = (req, res) => {
    if (req.session.isLoggedIn !== binaryAsString.true){
        res.status(500).send({message: "User is not logged in."});
        return false;
    }
    return true;
}

exports.standardizedResponse = ((message = {}, data = {}) => {
    return {message, ...data};
});