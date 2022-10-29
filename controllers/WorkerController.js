const Worker = require('../models/Worker');

const Login = async (req,res) => {
    // console.log(req.body);
    const {
        email,password
    } = req.body;

    if( !password || !email){
        res.status(201).send('You didnt type all the stuff!!');
    }else{

        
        const LoginWorker = await Worker.findOne({email});
        if(!LoginWorker){
            res.status(201).send('No worker found!');
        }else{
            const correctPassword = await LoginWorker.comparePassword(password);

            if(!correctPassword){
                res.status(201).send('Invalid credentials!');
                
                
            }else{
              
                const token = LoginWorker.getToken();
                res.cookie('token',token,{httpOnly:true});
                
                res.status(200).json({user:{name:LoginWorker.name,token,workerId:LoginWorker._id}});
                // res.status(200).cookie('token',token,options);
            }
            
           
        }
        
        }
    }
   

  
    


const Register = async (req,res) => {
   const goodRegister = 'Uspesno registrovan user!'
    const {
        name,password,email
    } = req.body;

    const RegisterWorker = await Worker.create({name,password,email});
    res.status(200).json({goodRegister});
}

module.exports = {
    Login,
    Register
}