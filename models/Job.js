const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'Please provide position'],
        maxlength:100
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:'User', // we tie job to user,
        required:[true,'Please provide user']
    }

})

module.exports = mongoose.model('Job',JobsSchema);


