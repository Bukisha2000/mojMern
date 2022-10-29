const Worker = require('../models/Worker');


const doubleEmail = async (req,res,next) => {
    var myError = 'You didnt specify the params!';
    const {
        name,password,email
    } = req.body;

    if(!name || !password || !email){
        res.status(406).json({myError});
    }else{
        
        const Email = await Worker.findOne({email:email});
   
        if(!Email){
            next();
        }else{
            myError = 'Email already in database'
            res.status(406).json({myError});
        }
    }
   
}
module.exports = doubleEmail;