const { StatusCodes } = require('http-status-codes');
const { ROUTE_NOT_FOUND } = require('../errors/user-messages');

const defaultHandler = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ msg: ROUTE_NOT_FOUND });

module.exports = defaultHandler;