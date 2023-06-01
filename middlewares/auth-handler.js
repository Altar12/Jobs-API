const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../errors');
const { UNAUTHORIZED } = require('../errors/user-messages');

const authHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthorized(UNAUTHORIZED);
    }
    const token = authHeader.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        throw new Unauthorized(UNAUTHORIZED);
    }
};

module.exports = authHandler;