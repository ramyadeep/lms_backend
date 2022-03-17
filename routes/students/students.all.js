const { mySqlConn } = require('../../database/db');    // import database connection

module.exports.allStudents = async (req, res) => {
    const db = await mySqlConn();
    const {dept_id} = req.body;

    let qry = `SELECT * FROM Students;`
    if(dept_id){
        qry = qry + `WHERE dept_id = ${db.escape(dept_id)}`
    }
    qry = qry+';';
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage,qry });
        } else {
            res.send({ message: "All registered Students", students: result});
        }
    })
}