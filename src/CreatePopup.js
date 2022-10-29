import React, { useState } from 'react'
import './CreatePopup.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreatePopup(props) {

    const [createUser,SetUser] = useState('');
 
    const [response,SetResponse] = useState('');
    const loggedUser = useSelector((state) => state.users);
    
    function ChangeCompany(e){
      SetUser({
        ...createUser,
        company: e.target.value,
    });
  }
  function ChangePosition(e){
    SetUser({
      ...createUser,
      position: e.target.value,
  });
}
function createJob(){
    var bodyParameters = {
    };
    bodyParameters.position =createUser.position
    bodyParameters.company =createUser.company
   
    axios.post('http://localhost:4000/api/jobs/create',bodyParameters,{
       withCredentials:true})
       .then((res)=> {SetResponse(res.data);
        props.RenderUpdatedJob();
        })
        .catch((err)=> SetResponse(err.response.data));
}
  return (
    <div id='CreateDivPopup'>
      <span>Hello {loggedUser.userName}!</span>
        <p>Company:</p>
        <input onChange={ChangeCompany}></input>
        <p>Position:</p>
        <input onChange={ChangePosition}></input>
        <button onClick={createJob}>Create</button>
        <button onClick={props.ManageCreatePopup}>Cancel</button>
        <p style={{color:'red'}}>{response}</p>
    </div>
  )
}
