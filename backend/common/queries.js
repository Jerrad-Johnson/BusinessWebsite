const {errorExistsNotInScript, errorExistsInScript} = require("./variables");
const {genericError} = require("../utils/fns");
const {pool} = require("./pool");
let cc = console.log;

exports.genericSQLPromise = async (query, values, res) => {
    let didError = errorExistsNotInScript;
    let queryResults;

    await new Promise ((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                cc(err);
                didError = errorExistsInScript;
                //genericError(res, err.sqlMessage);
                //reject(err.sqlMessage);
            }
            queryResults = results;
            resolve();
        });
    }).catch((e) => {
        throw new Error(e.sqlMessage);
    });

    return {error: didError, data: queryResults};
}