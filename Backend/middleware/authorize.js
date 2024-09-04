const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    console.log(token);
    if(!token) {
        return res.status(401).json({ message: 'No token, authorization denied'});
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log("*****",decoded.user);
        next();
    } catch(error){
        res.status(401).json({message: 'Token is not valid'});
    }
};

exports.admin = (req, res, next) => {
    console.log('req.user.role',req.user.role);
    if (req.user.role !== 'admin') {
        return res.status(403).json({message: 'Access denied, admin only'});
    }
    next();
};