const jwt = require('jsonwebtoken');
const privateKey = 'KEYFORAUTHENTICATION';

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(401).send({ message: 'Authorization token is not found!' });
        return;
    }
    jwt.verify(token, privateKey, (err, userData) => {
        if (err) return res.status(403).send({message:'You dont have the privilege.'});
        req.user = userData.user;
        next();
    })
}

