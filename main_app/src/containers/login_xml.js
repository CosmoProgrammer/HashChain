import React,{useState} from "react"; 
import "./style.css";

function Login(){
    const[errorMessages,setErrorMessages] = useState({});
    const[submitted,setSubmitted] = useState(false);
    

    const errors = {
        entered_username : "user not found in database",
        entered_password : "password does not match"
    }; 

    const HandleOnSubmit = (event) => {
        event.preventDefault();
        var new_request = new XMLHttpRequest();
        var creds = {'username':entered_username,'password':password};
        var{entered_username,entered_password} = document.forms[0];
        const ENTERED_DATA = 
        
    }
}