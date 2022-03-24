const { mySqlConn } = require("../../database/db");    // import database connection


module.exports.allCourses = async (req, res) => {
    const db = await mySqlConn();
    const qry = `SELECT * FROM COURSES;`;
    // const qry = `SELECT * FROM COURSES LEFT JOIN faculties ON f_id = faculties.id;`;
    console.log(req.user);
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "All registered courses", result })
        }
    })
}