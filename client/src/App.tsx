




import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginSuccess from './Pages/LoginSuccess/LoginSuccess';
import Login from './Pages/Login/Login';






const App:React.FC = () => {



    return (
      <>
            <Routes>
              <Route path='/' element={<Home />} /> 
              <Route path='/login' element={<Login />} /> 
              <Route path='/login-success' element={<LoginSuccess />}/>

            </Routes>
      
      </>
    )
}


export default App;
