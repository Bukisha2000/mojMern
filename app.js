require('dotenv').config();
const cors= require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const connectDB = require('./db/connect');
app.use(express.json());
const workerRouter = require('./routes/WorkerRouter');
const jobsRouter = require('./routes/JobsRouter');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(cookieParser());
const auth = require('./mid/auth');
const port = 4000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };


  
  start();
  
  app.get('/getcookie',(req,res)=> {
    res.cookie('NoviKorisnik',false);
    res.send('You got the cookie!');
  })
  app.get('/clearcookie',(req,res)=> {
    res.clearCookie('token');
    res.send('Success!');
  })

  app.get('/consolecookie', (req,res)=> {
   const cookie = req.cookies.token;
   res.json({cookie:cookie});
  })
  
  app.use('/api/workers/',workerRouter);
  app.use('/api/jobs',auth,jobsRouter);
  app.get('/',(req,res)=> {
    res.send('Pocetna stranica')
  })
