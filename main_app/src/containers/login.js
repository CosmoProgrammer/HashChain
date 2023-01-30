import React,{useState} from "react";

import "./style.css"; 


function Login(){
    const[errorMessages,setErrorMessages] = useState({});
    const[submitted,setsubmitted] = useState(false);
    

    const test_database = [
        {
            username : "EMPLOYEE1",
            password : "PASSWORD1"
        },
        {
            username: "EMPLOYEE2",
            password: "PASSWORD2"
        }
    ]; //TO:DO link with proper database

    const errors = {
        entered_username:"invalid username",
        entered_password:"invalid password"

    };

    const handleonSumbit = (event) => {
        event.preventDefault();
        var{entered_username,entered_password} = document.forms[0];

    
    const ENTERED_DATA = test_database.find((user) => user.username === entered_username);

    if(ENTERED_DATA){
        if(ENTERED_DATA.password !== entered_password.value){
            setErrorMessages({name:"entered_password",message:errors.entered_password})
        }
        else{
            setsubmitted(true);
        }

    }
    else{ 
        setErrorMessages({name:"entered_username", message:errors.entered_username})
    }
    };

<<<<<<< HEAD
//JSX-need someone else to work on this
=======
>>>>>>> 22a2328342c848df18ae8a057b6855b4e91db7a6
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="Form">
      <form onSubmit={handleonSumbit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("entered_username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {submitted ? <div>Signed in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
    
