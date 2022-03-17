const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');



module.exports.addStudent = async (req, res) => {
    const db = await mySqlConn();
    const { f_name, l_name, dept_id, password, email, contact } = req.body;

    if (_.isEmpty(f_name) || _.isEmpty(l_name) || _.isEmpty(_.toString(dept_id)) || _.isEmpty(password)) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return;
    }
    const qry = `INSERT INTO Students (f_name,l_name,dept_id,password,email,contact) VALUES (${db.escape(f_name)},${db.escape(l_name)},${db.escape(dept_id)},${db.escape(password)},${db.escape(email)},${db.escape(contact)});`;-

    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "Student Account added.", course_details: result });
        }
    })
}