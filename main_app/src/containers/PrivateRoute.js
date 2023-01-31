import React from 'react'
<<<<<<< Updated upstream
import { Outlet, Navigate } from 'react-router-dom'  


export default function PrivateRoute({ children }) {
    const { currentUser } = true
  
    if (!currentUser) {
      return <Navigate to='/' />
    }
  
    return children;
  }
  
=======
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    let  userid = localStorage.getItem("validated") == null ? true : true;
    return (
        <>
            {userid ? <Outlet  /> : <Navigate to="/signin" />};
        </>

    )

}
>>>>>>> Stashed changes
