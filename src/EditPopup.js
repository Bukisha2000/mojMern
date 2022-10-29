import axios from 'axios';
import React from 'react'
import './Popup.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function EditPopup(props) {
  const [updateUser,SetUser] = useState('');

  const loggedUserToken = useSelector((state) => state.users.userToken);
  const loggedUserName = useSelector((state) => state.users.userName);
  function ChangeCompany(e){
    SetUser({
      ...updateUser,
      company: e.target.value,
  });
}
function ChangePosition(e){
    SetUser({
      ...updateUser,
      position: e.target.value,
  });
}

  function UpdateJob(){
    var bodyParameters = {};
    if(updateUser.company !== ""){
        bodyParameters.company = updateUser.company;
    }
    if(updateUser.position !== ""){
        bodyParameters.position = updateUser.position;
    }
    axios.patch(`http://localhost:4000/api/jobs/${props.updateID}`,bodyParameters,{
      withCredentials:true}).then((res)=> {
            if(res.status == 200){
                props.RenderUpdatedJob();
                console.log(res);
            }
           
        }).catch((err)=> console.log(err));
  }
  return (
    <div id='EditDivPopup'>
        <p>{loggedUserName} You are gonna update the job with id {props.updateID}</p>

        <p>Company:</p>
        <input onChange={ChangeCompany}></input>
        <p>Position:</p>
        <input onChange={ChangePosition}></input>
        <button onClick={UpdateJob}>Update</button>
        <button onClick={props.ClosePopup}>Cancel</button>
    </div>
  )
}
