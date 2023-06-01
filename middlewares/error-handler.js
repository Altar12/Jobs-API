const { StatusCodes } = require('http-status-codes');
const { SERVER_ERROR, JOB_NOT_FOUND } = require('../errors/user-messages');

const errorHandler = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || SERVER_ERROR
    };
    if (err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = JOB_NOT_FOUND
    }
    //res.json({ err });
    res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;