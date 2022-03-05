// import database connection
const { mySqlConn } = require('../../database/db');
const _ = require('lodash');


function generateDynamicQuery(params,db) {
    // Process SQL Query
    const { id, dept_id, password, contact, email } = params;
    let qry = `UPDATE Student SET `;
    if (dept_id) {
        qry += `dept_id = ${db.escape(dept_id)},`;
    }
    if (password) {
        qry += `password = ${db.escape(password)},`;
    }
    if (contact) {
        qry += `contact = ${db.escape(contact)},`;
    }
    if (email) {
        qry += `email = ${db.escape(email)},`;
    }
    if (id) {
        qry = qry.substring(0, qry.length - 1); // remove trailing ',' from the SQL Query
        qry += ` WHERE id = ${db.escape(id)}`;
    }
    qry += `;`;
    return qry;
}


module.exports.updateStudent = async (req, res) => {
    const db = await mySqlConn()

    if (_.isEmpty(req.body.id)) {
        res.send({ message: "Student Id is mandatory." });
        return
    }
    const qry = generateDynamicQuery(req.body,db);

    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage, qry });
        } else {
            res.send({ message: "The Student is updated.", result });
        }
    });

}