const authHandler = require('./auth-handler');
const defaultHandler = require('./default-handler');
const errorHandler = require('./error-handler');

module.exports = {
    authHandler,
    defaultHandler,
    errorHandler
};