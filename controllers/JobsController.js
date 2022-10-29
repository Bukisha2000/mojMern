const Job = require('../models/Job');

const CreateJob = async (req,res) => {
    const {
        company,position
    } = req.body;
    if(!company || !position){
        res.status(400).send('Please enter all credentials');
    }else{
        const createdBy = req.worker.workerId
   
        const CreateJob = await Job.create({company,position,createdBy: createdBy});
    
        if(CreateJob){
            res.status(200).send('Successfully created the job!');
        }else{
            res.status(400).send('Job not created!');
        }
    }
  


}
const GetAllJobs = async (req,res) => {
   const workerId = req.worker.workerId;
    const AllJobs = await Job.find({createdBy:workerId});
        
    res.status(200).json({AllJobs});
   
}
const getSingleJob = async (req,res) => {
    const workerId = req.worker.workerId;
    const jobId = req.params.id;
    const singleJob = await Job.findOne({createdBy:workerId,_id:jobId});
        if(!singleJob){
            res.send(`No job found with id: ${jobId}`)
        }else{
            res.status(200).json({singleJob});
        }
   
   
}
const updateJob = async (req,res) => {
    const workerId = req.worker.workerId;
    const jobId = req.params.id;
    console.log(jobId,workerId);
    const singleJob = await Job.findOneAndUpdate({createdBy:workerId,_id:jobId},req.body);
    if(!singleJob){
        res.status(404).send(`Can't find Job with id ${jobId}`);
    }else{
        res.status(200).json({singleJob});
    }
}
const deleteJob = async (req,res) => {
    const workerId = req.worker.workerId;
    const jobId = req.params.id;
   
    const singleJob = await Job.findOneAndDelete({createdBy:workerId,_id:jobId});

    if(!singleJob){
        res.status(404).send(`Can't find Job with id ${jobId}`);
    }else{
        res.status(200).json({singleJob});
    }
}

module.exports = {
    CreateJob,GetAllJobs,getSingleJob,updateJob,deleteJob
}