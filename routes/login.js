const { mySqlConn } = require("../database/db");    // import database connection
const jwt = require('jsonwebtoken');

// signup route handler
module.exports.login = async (req, res) => {
    const db = await mySqlConn();   // create a db instance

    const { account_type, email, password } = req.body;  // extract data from routes

    const qry = `SELECT * FROM ${account_type} WHERE email = ${db.escape(email)} AND password = ${db.escape(password)};`;

    db.query(qry, (err, result) => {
        if (err) { res.status(500).send({ message: err.sqlMessage }); }      // handle database errors
        else if (result.length == 0) {
            res.send({ message: "Access Denied!" });                    // Account not Found
        }
        else {
            const privateKey = 'KEYFORAUTHENTICATION';                  //TODO: save in env variable
            const user = result[0];
            jwt.sign({ user }, privateKey, { expiresIn: '30m' }, async (err, token) => {
                if (err) {
                    res.status(500).send({ message: "unable to generate a token for the user.", err });
                }
                else {
                    res.send({
                        token,                                             // Account Found
                        account: user,
                        message: "Account found."
                    });
                }
            });
        }
    });

}