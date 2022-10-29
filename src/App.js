
import React from 'react';

import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login';
import Page from './Page';
import ProtectedRouta from './ProtectedRouta';
import ProtectedPage from './ProtectedPage'
import { useState } from 'react';

function App() {
 
  return (
    <Router>
    <Routes>
      <Route element={<ProtectedRouta />}>
          <Route element={<Register/>} path="/register" />
          <Route element={<Login/>} path="/login" />
          
          </Route>
          <Route element={<ProtectedPage />}>
          <Route element={<Page/>} path="/" />
          </Route>
     </Routes>
    
</Router>
  );
}

export default App;
