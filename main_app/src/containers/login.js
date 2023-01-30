import React,{useState} from "react";

import "./style.css"; 
//port 7863/Login/

function Login(){
    const[errorMessages,setErrorMessages] = useState({});
    const[submitted,setsubmitted] = useState(false);
    const errors = {
        entered_username:"invalid username",
        entered_password:"invalid password"

    };
    const handleonSumbit = (event) => {
        event.preventDefault();
        let credentials = {'username':entered_username,'password':entered_username};
        new_request = new XMLHttpRequest(); 
        new_request.onreadystatechange = function(){
          if(new_request.readyState===4 && new_request.status===200){
              if(this.responseText==='false' || this.responseText===false){
                  localStorage.setItem('authenticated', this.responseText)
              } else{
                  localStorage.setItem('authenticated', true);
                  let tempVar = JSON.parse(this.responseText);
                  localStorage.setItem('username', tempVar['username']);
                  localStorage.setItem('userID', tempVar['userID']);
                  props.history.push("/onlyAuthorizedAllowedHere/home")
              }
          }   
      }
      request.open('GET', 'http://localhost:7863/login/'+JSON.stringify(credentials), true);
      request.send();
    };
    

//JSX-need someone else to work on this
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
    
