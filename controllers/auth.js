const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequest } = require('../errors');
const { BAD_REQUEST_LOGIN, BAD_REQUEST_REGISTER, USER_NOT_FOUND } = require('../errors/user-messages');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequest(BAD_REQUEST_REGISTER);
    }
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest(BAD_REQUEST_LOGIN);
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequest(USER_NOT_FOUND);
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token });
};

module.exports = {
    register,
    login
};