const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const { NotFound } = require('../errors');
const { JOB_NOT_FOUND } = require('../errors/user-messages');

const createJob = async (req, res) => {
    const userID = req.user.userID;
    const job = await Job.create({ ...req.body, createdBy: userID });
    res.status(StatusCodes.CREATED).json(job);
};

const getAllJobs = async (req, res) => {
    const userID = req.user.userID;
    const jobs = await Job.find({ createdBy: userID }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;
    const job = await Job.findOne({ createdBy: userID, _id: jobID });
    if (!job) {
        throw new NotFound(JOB_NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;
    const job = await Job.findOneAndUpdate({ createdBy: userID, _id: jobID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!job) {
        throw new NotFound(JOB_NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;
    const job = await Job.findOneAndDelete({ createdBy: userID, _id: jobID });
    if (!job) {
        throw new NotFound(JOB_NOT_FOUND);
    }
    res.status(StatusCodes.OK).json(job);
};

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
};