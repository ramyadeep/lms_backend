const { mySqlConn } = require("../database/db");    // import database connection
const _ = require('lodash');                   // data validation library

// signup route handler
module.exports.signup = async (req, res) => {
    const db = await mySqlConn();   // create a db instance
    const { account_type, f_name, l_name, password, email, contact, dept_id } = req.body; // extract data form http body

    // data validation and checking
    if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(f_name)) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return
    } else {
        // query for non admins
        let qry = `INSERT INTO ${account_type} (f_name,l_name,password,email,contact,dept_id) VALUES (${db.escape(f_name)},${db.escape(l_name)},${db.escape(password)},${db.escape(email)},${db.escape(contact)},${db.escape(dept_id)});`;
        if (_.lowerCase(account_type) == 'admin') {
            // query for admins only
            qry = `INSERT INTO ${account_type} (f_name,l_name,password,email,contact) VALUES (${db.escape(f_name)},${db.escape(l_name)},${db.escape(password)},${db.escape(email)},${db.escape(contact)});`;
        }

        db.query(qry, (err, result) => {
            if (err) res.status(500).send({ message: err.sqlMessage });
            else {
                res.send({
                    message: "Account created using the data."
                });
            }
        });
    }

}