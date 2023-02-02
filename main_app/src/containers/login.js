import React,{useState} from "react";
import "../styles/style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import webcon from "../styles/ICON.png";
import { Link } from "react-router-dom";

function Login(props){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    function validateForm(){
      return username.length >0 && password.length > 0;
    }
    async function HandleOnSubmit(event){
      event.preventDefault();
      var credentials = {'username':username,'password':password};
      const response = await fetch('http://localhost:7793/login/'+JSON.stringify(credentials));
      console.log(response)
      if(response){

        localStorage.setItem('authenticated',true);
        navigate('/home/')//not valid
      }
      else{ 
        navigate('http://localhost:7793/')
        const notify = () => toast("Invalid username or password"); 
        alert(notify)
        //porth put this notify in the tag for invalid


      }
      
    }

//JSX-need someone else to work on this
return (<>
<div>
<li>
        <ul className="title"><Link to='/Home'><a><img src={webcon} style={{height:'110px'}}/>HashChain</a></Link></ul>
        <ul className="subhead">"A mathematical framework that is free of politics and human error"</ul></li>
</div>
  <div className="form">
    <form onSubmit={HandleOnSubmit}>
      <div className="input-container">
        <label>Username</label>
        <input type="text" name="username"
          onChange={(u)=>setUsername(u.target.value)}
         required/>
        
      </div>
      <div className="input-container">
          <label>Password</label>
          <input type="password" name="password" 
          onChange={(p)=>setPassword(p.target.value)}
          required/>

      </div>
      <div className="button-container">
          <input type="submit" />
        </div>
      </form> 
</div>
</>);

}

export default Login;

