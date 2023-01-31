import React,{useState} from "react";
import "../styles/style.css";

function Login(){
    const[errorMessages,setErrorMessages] = useState({});
    const[submitted,setsubmitted] = useState(false);
    

  function validateForm(entered_username,entered_password){
    var request = new XMLHttpRequest();
    var credentials = {'username':entered_username,'password':entered_password};
    request.onreadystatechange = function(){
      if(request.readyState===4 && request.status ===200){
        if(this.responseText==='false' || this.responseText === false){
          localStorage.setItem('authenticated',this.responseText);
          return false;
        }
        else{
          localStorage.setItem("authenticated",true);
          return true;
        }
      }
        request.open('GET','http://localhost:7863'+JSON.stringify(credentials),true);
        request.send();
    }

  }

    const errors = {
        entered_username:"invalid username",
        entered_password:"invalid password"

    };

    const handleonSumbit = (event) => {
        event.preventDefault();

        var{entered_username,entered_password} = document.forms[0];

        const ENTERED_DATA = validateForm(entered_username,entered_password);

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



    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

//JSX-need someone else to work on this

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

