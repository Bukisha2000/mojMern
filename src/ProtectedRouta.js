import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
export default function ProtectedRouta(props) {
  var provera = false;
var token = sessionStorage.getItem('token');

if(token == 'true'){
  provera = true;
}
  return (
 
   provera ?    <Navigate to='/'/> :  <Outlet/>  
   
  )
}
