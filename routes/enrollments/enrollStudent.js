const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');



module.exports.registerStudentToCourse = async (req, res) => {
    const db = await mySqlConn();
    const { c_id, s_id } = req.body;
    if (_.isEmpty(c_id) || _.isEmpty(_.toString(s_id))) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return;
    }
    const qry = `INSERT INTO Enrollments (c_id,s_id) VALUES (${db.escape(c_id)},${db.escape(s_id)});`;
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "Student Registered to course", course_details: result });
        }
    })

}