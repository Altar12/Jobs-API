require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const express = require('express');
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');
const connectDB = require('./database/connect');
const { authHandler, defaultHandler, errorHandler } = require('./middlewares');

const app = express();
app.set('trust proxy', 1); // for using reverse proxy (heroku, aws etc.)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
})); // allow a max of 100 requests from a client in 15 mins
app.use(helmet()); // set response headers for security
app.use(cors()); // allow requests from outside of same domain
app.use(xss()); // cleanse the request to avoid code injection attacks

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authHandler, jobsRouter);

app.use(defaultHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    } catch (error) {
        console.log('Error while starting the server', error);
    }
}

start();