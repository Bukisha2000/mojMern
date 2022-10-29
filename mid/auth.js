const Worker = require('../models/Worker');
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
//check header

// const authHeader = req.headers.authorization

// if(!authHeader || !authHeader.startsWith('Bearer')){
//     res.status(205).send('Auth failed!');
// }else{

//     const token = authHeader.split(' ')[1];
   
    try{
        const token = req.cookies.token;
        const payload = jwt.verify(token,process.env.JWT_SECRET);
       
        // attaching the user to the job route
        req.worker = {workerId:payload.userId,name:payload.name}
      
        // by next we export user to job route
      
        next();
    }catch(error){
       
   res.status(400).send('Auth failed!');
    }
}

// we get the token by this up


module.exports = auth;