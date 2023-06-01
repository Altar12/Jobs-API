const express = require('express');
const { createJob,
        getAllJobs,
        getJob,
        updateJob,
        deleteJob } = require('../controllers/jobs');

const router = express.Router();
router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;