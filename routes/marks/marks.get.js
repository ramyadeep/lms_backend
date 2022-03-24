const { mySqlConn } = require('../../database/db');    // import database connection

module.exports.marksAll = async (req, res) => {
    const db = await mySqlConn();
    const { dept_id } = req.body;

    let qry = `SELECT s_id, Students.f_name, Students.l_name, c_id, mark  FROM Marks LEFT JOIN Students ON Marks.s_id = Students.id`;

    if (dept_id) {
        qry = qry + `WHERE dept_id = ${db.escape(dept_id)}`
    }
    qry = qry + ';';

    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage, qry });
        } else {
            res.send({ message: "All registered Students", students: result });
        }
    })
}