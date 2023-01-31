import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'  


export default function PrivateRoute({ children}){
  const isAuthenticated = true;
  console.log(isAuthenticated)
  if (isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/login" />
}

