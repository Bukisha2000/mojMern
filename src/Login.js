import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import axios from "axios"
import { createSlice } from '@reduxjs/toolkit'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from "./ReduxHelper"


export default function Login(props){

    const [answer,SetAnswer] = useState('');
    const [data,SetData] = useState([]);
    const [notify,SetNotification] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    function ChangePassword(e){
      SetData({
        ...data,
        password: e.target.value,
    });
    }
    function ChangeEmail(e){
      SetData({
        ...data,
        email: e.target.value,
    });
    }
  
    const Login = () => {
        const bodyParameters = {
            email: data.email,
            password: data.password
        }

        axios.post("http://localhost:4000/api/workers/login", bodyParameters,{withCredentials:true})
        .then((res)=> {
            if(res.status == 200){
               
                SetNotification('Hello: ' + res.data.user.name);
               
                // dispatch(addUser({name:res.data.user.name,token:res.data.user.token}))
                sessionStorage.setItem('token',true);
                navigate('/');
           
            }else{
                SetNotification(res.data)
            }
       
        })
        .catch((err) => console.log(err));
    };
    
    function Register(){
        navigate('/register');
    }
   
    return(
        <>
       <div id='LoginFormDiv'>
    <span>Enter your email:</span>
    <input onChange={ChangeEmail}></input>
    <span>Enter your password:</span>
    <input onChange={ChangePassword}></input>
   <button onClick={Login}>Login</button>

   <button onClick={Register}>Register instead?</button>

    <p style={{color:'red'}}>{notify}</p>
   </div>
        </>
    )
}