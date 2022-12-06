const {sessionSecret} = require("./session_secret");

exports.sessionOptions = {
    secret: sessionSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    },
}