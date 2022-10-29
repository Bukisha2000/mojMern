
import React from 'react';
import './Register.css';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate();
  const [answer,SetAnswer] = useState('');
  const [data,SetData] = useState([]);
  function ChangeName(e){
    SetData({
      ...data,
      name: e.target.value,
  });
  }
  function ChangeEmail(e){
    SetData({
      ...data,
      email: e.target.value,
  });
  }
  function ChangePassword(e){
    SetData({
      ...data,
      password: e.target.value,
  });
  }
  function RegisterUser(){
    const UserForBase = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    console.log(UserForBase);
    fetch('http://localhost:4000/api/workers/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(UserForBase)
  })
      .then(response => response.json())
      .then(responseFromServer => {
        if(!responseFromServer.myError){
          SetAnswer(responseFromServer.goodRegister);
        }else{
          SetAnswer(responseFromServer.myError);
        }
         
      }
      )
      .catch((error) => {
         
        alert(error);
      })
    
  }
  function NavigateLogin(){
    navigate('/login');
  }
  return (
   <>
   <div id='RegisterFormDiv'>
    <span>Enter your name:</span>
    <input onChange={ChangeName}></input>
    <span>Enter your email:</span>
    <input onChange={ChangeEmail}></input>
    <span>Enter your password:</span>
    <input onChange={ChangePassword}></input>
    <button onClick={RegisterUser}>Register</button>
    <button onClick={NavigateLogin}>Login Instead?</button>

    <p style={{color:'red'}}>{answer}</p>
   </div>
   </>
  );
}


