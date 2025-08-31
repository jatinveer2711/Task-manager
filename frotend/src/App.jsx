import React from 'react';
import {Route, Routes} from "react-router-dom"
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/login' element={<Login></Login>} />
      </Routes>
    </div>
  )
}
