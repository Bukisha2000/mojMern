const express = require('express');
const {CreateJob,getSingleJob,GetAllJobs,updateJob,deleteJob} = require('../controllers/JobsController');
const { update } = require('../models/Worker');
const router = express.Router();

router.post('/create',CreateJob)
router.delete('/delete/:id',deleteJob);
router.get('/',GetAllJobs);
router.get('/:id',getSingleJob);
router.patch('/:id',updateJob);


module.exports = router;

