const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');



module.exports.marksAdd = async (req, res) => {
    const db = await mySqlConn();
    const { c_id, s_id, mark } = req.body;
    const f_id = req.user.id;
    if (_.isEmpty(c_id) || _.isEmpty(s_id) || _.isEmpty(mark)) {
        res.status(400).send({ message: "Please Provide all the fields" });
        return;
    }

    const qry = `INSERT INTO Marks (c_id,s_id,mark) VALUES (${db.escape(_.toString(c_id))},${db.escape(s_id)}, ${db.escape(_.toString(mark))});`; -
        db.query(qry, (err, result) => {
            if (err) {
                res.status(500).send({ message: err.sqlMessage,qry });
            } else {
                res.send({ message: "Student Marks uploaded.", course_details: result });
            }
        })
}