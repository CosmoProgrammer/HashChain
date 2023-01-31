import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'  


export default function PrivateRoute({ children }) {
    const { currentUser } = true
  
    if (!currentUser) {
      return <Navigate to='/' />
    }
  
    return children;
  }
  