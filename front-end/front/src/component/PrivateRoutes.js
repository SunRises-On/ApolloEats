import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
//Route Guard component is an
//authentication middleware.
//switch to redux and 
//redux middleware
const PrivateRoutes =()=>{
    hasJWT();
    function hasJWT(){
        let auth = false;
        auth = sessionStorage.getItem("token") ? true : false;
        console.log("In Private Routes token = " +auth);
        return auth;
    }
    
    return(
        hasJWT()? 
            <Outlet/> 
            : 
            <Navigate to='/login'/>
    )
}

export default PrivateRoutes;