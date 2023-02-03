import React from 'react';
import '../styles/style.css';
import '../styles/home.css';

function NoPageFound(){
    console.log('No page found');
    return(
        <div className='home' style = {{
            
                fontFamily: "newfont1",
                fontSize: "100px",
                textAlign: "center",
                color: "rgb(255,255,255)",
                position:"relative",
        }}>
            AccessDenied
        </div>
    )
}

export default NoPageFound;