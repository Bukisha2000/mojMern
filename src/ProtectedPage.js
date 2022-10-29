import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import ProtectedRouta from './ProtectedRouta';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

export default function ProtectedPage(props) {
  var provera = false;
var token = sessionStorage.getItem('token');

if(token == 'true'){
  provera = true;
}

  return (
    
   provera ?  <Outlet/> :  <Navigate to='/login'/> 
  
  )
}
