// import database connection
const { mySqlConn } = require('../../database/db');
const _ = require('lodash');


module.exports.dropStudent = async (req, res) => {
    const db = await mySqlConn()
    const { id } = req.body;
    if(_.isEmpty(id)){
        res.status(400).send({message:"Student Id is mandatory!"});
        return
    }
    const qry = `DELETE FROM Student WHERE id = ${db.escape(id)};`;
    db.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "The Student is removed.", result });
        }
    });
}