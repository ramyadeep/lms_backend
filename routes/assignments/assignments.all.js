const { mySqlConn } = require("../../database/db");    // import database connection


module.exports.allAssignments = async (req, res) => {
    const db = await mySqlConn();
    const qry = `SELECT * FROM Assignments;`;
    console.log(req.user);
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "All Assignments.", result })
        }
    })
}