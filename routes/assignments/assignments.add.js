const { mySqlConn } = require('../../database/db');    // import database connection
const _ = require('lodash');



module.exports.addAssignment = async (req, res) => {
    const db = await mySqlConn();
    const { topic, description, c_id, deadline } = req.body;

    if (_.isEmpty(topic) || _.isEmpty(description) || _.isEmpty(_.toString(c_id))) {
        res.status(400).send({ message: "Please Provide all the fields" });
        // console.log(c_id);
        return;
    }
    let qry;

    if (deadline) {
        qry = `INSERT INTO Assignments (topic,description,deadline,c_id,f_id) VALUES (${db.escape(topic)},${db.escape(description)},${db.escape(deadline)},${db.escape(c_id)},${db.escape(req.user.id)})`;
    } else {
        qry = `INSERT INTO Assignments (topic,description,c_id,f_id) VALUES (${db.escape(topic)},${db.escape(description)},${db.escape(c_id)},${db.escape(req.user.id)})`;
    }
    db.query(qry, (err, result) => {
        if (err)
            res.status(500).send({ message: err.sqlMessage, qry });
        else
            res.send({ message: "Assignment Published!", course_details: result });

    })
}