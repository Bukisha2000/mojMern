import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Page.css'
import EditPopup from './EditPopup'
import CreatePopup from './CreatePopup'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeUser } from './ReduxHelper'
import { RemoveItem } from './constants/RemoveItem'
export default function Page(props) {



  const [jobs,SetJobs] = useState([]);
  const [isAuth,SetAuth] = useState(false);
  const [myError,SetError] = useState('');
  const [control,SetControl] = useState(0);
  const [showEditPopup,SetPopup] = useState(false);
  const [showCreatePopup,SetCreatePopup] = useState(false);
  const [jobId,SetJobId] = useState('');
  const navigate = useNavigate();
  // const loggedUser = useSelector((state) => state.users);


  const dispatch = useDispatch();
  useEffect(() => {

   axios.get('http://localhost:4000/api/jobs/',{
   withCredentials:true}).then((res)=> {
     
    SetJobs(res.data.AllJobs);
      SetAuth(true);
   }).catch((err)=> {SetError(err.response.data);
  
    sessionStorage.clear();
  navigate('/login')
});
  }, [control]);

  function removeItem(e){
    const id = e.target.value;

    axios.delete(`http://localhost:4000/api/jobs/delete/${id}`,{
    withCredentials:true}).then((res)=>{
        if(res.status == 200){
          SetControl(prev => prev+1);
        }
      
    }).catch((err)=> console.log(err));
  }
  function ShowPopup(e){
    SetJobId(e.target.value);
    SetPopup(true);
  }
  function ClosePopup(){
    SetPopup(false);
  }
  function RenderJobs() {
    return(
    jobs.map((job)=> (
      <div className='childJobsDiv' key={job._id}>
      <p>{job.company}</p>
      <p>{job.position}</p>
      <button onClick={(e) => removeItem(e.target.value)} value={job._id}>Delete Job</button>
      <button onClick={ShowPopup} value={job._id}>Update job</button>
      </div>
    )))
  }
  function Logout(){
   
  
   axios.get('http://localhost:3000/clearcookie',{withCredentials:true})
   .then((res)=> console.log(res.data));
    sessionStorage.clear();
  
    navigate('/login');
  }
  function RenderUpdatedJob(){
    SetControl(prev => prev +1);
  }
  function ManageCreatePopup(){
   if(showCreatePopup){
    SetCreatePopup(false);
   }else{
    SetCreatePopup(true);
   }
  }
  return (
   <>
     {showEditPopup && <EditPopup updateID={jobId} ClosePopup = {ClosePopup} RenderUpdatedJob={RenderUpdatedJob}/>}
     {showCreatePopup && <CreatePopup ManageCreatePopup={ManageCreatePopup} RenderUpdatedJob = {RenderUpdatedJob}/>}
   <div id='ListJobs'>
    {isAuth &&  RenderJobs()}
   
    
   </div>
 <button style={{marginLeft:'100px'}} onClick={Logout}>Logout</button>
 <button style={{marginLeft:'100px',marginTop:'50px'}} onClick={ManageCreatePopup}>Create New Job</button>
 
   <p style={{color:'red'}}>{myError}</p>
   </>
  )
}
