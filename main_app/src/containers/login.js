import React,{useState} from "react";
import "../styles/style.css";

function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function handleonSubmit(event){
        event.preventDefault();
        var request = new XMLHttpRequest();
        var credentials = {'username': username, 'password': password};
        request.onreadystatechange = function(){
            if(request.readyState===4 && request.status===200){
                if(this.responseText==='false' || this.responseText===false){
                    localStorage.setItem('authenticated', this.responseText)
                } else{
                    localStorage.setItem('authenticated', true);
                    let Var = JSON.parse(this.responseText);
                    localStorage.setItem('username', Var['username']);
                    localStorage.setItem('password', Var['password']);
                    props.history.push("/someplace/");
                }
            }   
        }
        request.open('GET', 'http://localhost:7863/login/'+JSON.stringify(credentials), true);
        request.send();
    }

//JSX-need someone else to work on this

  const renderForm = (
    <div className="Form">
      <form onSubmit={handleonSubmit}>
        <div className="input-container">
          <label>Username </label>
            
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
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
      </div>
    </div>
  );
}

export default Login;

