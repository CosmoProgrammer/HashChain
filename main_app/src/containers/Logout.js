import {React, useEffect} from "react";
import { Navigate } from "react-router-dom";


const Logout = () => {
    localStorage.setItem('username','');
    localStorage.setItem('authenticated',false);
    return(
        <Navigate to="/login" />
    )

}

export default Logout