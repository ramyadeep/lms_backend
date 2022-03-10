const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');



module.exports.addCourse = async (req, res) => {
    const db = await mySqlConn();
    const { c_name, f_id, dept_id } = req.body;
    if (_.isEmpty(c_name) || _.isEmpty(_.toString(f_id)) || _.isEmpty(_.toString(dept_id))) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return;
    }
    const qry = `INSERT INTO Courses (c_name,f_id,dept_id) VALUES (${db.escape(c_name)},${db.escape(f_id)},${db.escape(dept_id)});`;
    db.query(qry, (err, result) => {
        if (err) {
            // console.log(req.body);
            // console.log(qry);
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "Course has been created", course_details: result});
        }
    })
    // res.send({ c_name, f_id, dept_id });

    // res.send({})
}