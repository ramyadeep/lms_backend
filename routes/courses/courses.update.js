// import database connection
const _ = require('lodash');
const { mySqlConn } = require('../../database/db');

function generateDynamicQuery(params, db) {
    // Process SQL Query
    const { c_id, c_name, f_id, dept_id }  = params;
    let qry = `UPDATE Courses SET `;
    if (dept_id) {
        qry += `dept_id = ${db.escape(dept_id)},`;
    }
    if (c_name) {
        qry += `c_name = ${db.escape(c_name)},`;
    }
    if (f_id) {
        qry += `f_id = ${db.escape(f_id)},`;
    }

    if (c_id) {
        qry = qry.substring(0, qry.length - 1); // remove trailing ',' from the SQL Query
        qry += ` WHERE c_id = ${db.escape(c_id)}`;
    }
    qry += `;`;
    return qry;
}

module.exports.updateCourse = async (req, res) => {
    const db = await mySqlConn()
    if (_.isEmpty(req.body.c_id)) {
        res.status(403).send({ message: "Course ID is mandatory." });
        return;
    }

    const qry = generateDynamicQuery(req.body, db);

    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "The course is updated.", result });
        }
    });
}