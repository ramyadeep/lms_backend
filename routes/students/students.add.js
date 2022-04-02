const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');
const bcrypt = require('bcrypt');               // library for hashing the password
const saltRounds = 10;                          // number of salt rounds used for hashing



module.exports.addStudent = async (req, res) => {
    const db = await mySqlConn();
    const { f_name, l_name, dept_id, password, email, contact } = req.body;
    const qry = `INSERT INTO Students (f_name,l_name,dept_id,password,email,contact) VALUES (${db.escape(f_name)},${db.escape(l_name)},${db.escape(dept_id)},${db.escape(hashedPassword)},${db.escape(email)},${db.escape(contact)});`;

    if (_.isEmpty(f_name) || _.isEmpty(l_name) || _.isEmpty(_.toString(dept_id)) || _.isEmpty(password)) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return;
    }
    let hashedPassword;
    bcrypt.hash(password, saltRounds).then((hash) => hashedPassword = hash)

    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "Student Account added.", course_details: result });
        }
    })
}