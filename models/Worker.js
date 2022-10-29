const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const WorkerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Please provide a name']
    },
    password: {
        type:String,
        required:[true,'Please provide a password']

    },
    email: {
        type:String,
        required:[true,'Please provide an email']
    }
})

WorkerSchema.methods.getToken = function(){
    const token = jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'});
    return token
}
WorkerSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password,this.password);
    return isMatch;
}
WorkerSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password,salt);

    // next();
})
module.exports = mongoose.model('Worker',WorkerSchema);