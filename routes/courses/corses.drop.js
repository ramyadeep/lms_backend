// import database connection
const { mySqlConn } = require('../../database/db');



module.exports.dropCourse = async (req, res) => {
    const db = await mySqlConn()
    const { c_id } = req.body;

    if (_.isEmpty(c_id)) {
        res.status(400).send({ message: "Course ID is mandatory!" });
        return
    }

    const qry = `DELETE FROM Courses WHERE c_id = ${db.escape(c_id)};`;
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "The course is deleted.", result });
        }
    });
}