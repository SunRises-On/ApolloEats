import './App.css';
import React from 'react';
import {Navigate, Routes, Route, Outlet } from "react-router-dom";

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestRegister from './pages/RestRegister';
import PrivateRoutes from './component/PrivateRoutes';
import {setAuthToken} from './helpers/setAuthToken.js';
//component
import UserHeader from './component/UserHeader';
import Footer from './component/Footer';
import Management from './pages/Management';



function BasicLayout(){
  return(
    <>
      <UserHeader/>
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  //check if already authenticated
  const token = sessionStorage.getItem("token");
  if(token){
    setAuthToken(token);
  }
    
  return(
    <div className="App">
           <Routes>
              <Route element ={<PrivateRoutes/>}>
                <Route element={<BasicLayout/>}>
                  <Route path='restaurants/' element={<Restaurants/>}/>
                  <Route path='restaurants/register' element={<RestRegister/>}/> 
                  <Route path='restaurants/management' element={<Management/>}/>
                </Route>
              </Route>
              <Route path="/" element={<BasicLayout/>}>
                <Route index element={<Home/>} />
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
              </Route>
               {/* when we make an invalid path we will be redirected to home page component */}
               <Route path='*' element={<Navigate to="/"/>} /> 
          </Routes>
    </div>
   );
}

export default App;
