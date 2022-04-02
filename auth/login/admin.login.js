const { mySqlConn } = require("../../database/db");    // import database connection
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');               // library for hashing the password


// signup route handler
module.exports.AdminLogin = async (req, res) => {
    const db = await mySqlConn();   // create a db instance

    const { email, password } = req.body;  // extract data from routes

    const qry = `SELECT * FROM Admins WHERE email = ${db.escape(email)} LIMIT 1;`;

    db.query(qry, (err, result) => {
        if (err) { res.status(500).send({ message: err.sqlMessage }); }      // handle database errors
        else if (result.length == 0) {
            res.send({ message: "User not found!" });                    // Account not Found
        }
        else {
            const privateKey = 'KEYFORAUTHENTICATION';                  //TODO: save in env variable
            const user = result[0];                                     //records loaded form the database
            user.account_type = 'admin';
            bcrypt.compare(password, user.password).then((auth) => {
                if (auth) {
                    jwt.sign({ user }, privateKey, { expiresIn: '30m' }, async (err, token) => {
                        if (err) {
                            res.status(500).send({ message: "unable to generate a token for the user.", err });
                        }
                        else {
                            console.log(`Logged in as ${user.email}`)
                            res.send({
                                token,                                             // Account Found
                                user
                            });
                        }
                    });
                } else {
                    res.status(500).send({ message: "Incorrect user name or password." });
                }
            });

        }
    });

}