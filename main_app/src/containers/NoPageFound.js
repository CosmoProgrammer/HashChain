import React from 'react';
import '../styles/style.css';

function NoPageFound(){
    console.log('No page found');
    return(
        <div style = {{
            
                fontFamily: "newfont1",
                fontSize: "100px",
                textAlign: "center",
                color: "rgb(0,0,0)",
                position:"relative",
        }}>
            No page found
        </div>
    )
}

export default NoPageFound;