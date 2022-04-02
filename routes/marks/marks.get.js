const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');

module.exports.marksAll = async (req, res) => {
    const db = await mySqlConn();
    const { dept_id, s_id } = req.body;

    let qry = `SELECT s_id, Students.f_name, Students.l_name, c_id, mark  FROM Marks LEFT JOIN Students ON Marks.s_id = Students.id`;


    if (s_id) {
        qry = qry + ` WHERE s_id = ${db.escape(s_id)}`
    }

    if (dept_id) {
        if (s_id)
            qry += ' AND '
        else
            qry += ' WHERE '
        qry = qry + `dept_id = ${db.escape(dept_id)}`
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