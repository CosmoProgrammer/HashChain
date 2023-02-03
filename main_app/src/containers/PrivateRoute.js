import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'  
import AccessDenied from './AccessDenied';


export default function PrivateRoute({ children}){
  const isAuthenticated = localStorage.getItem("authenticated");
  console.log(isAuthenticated)
  if (isAuthenticated ) {
    return children
  } else{
    return(
      <AccessDenied />
    )
  }
    
  return <Navigate to="/login" />
}

