import React,{useState} from "react";
import "../styles/style.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'react-toastify/dist/ReactToastify.css';


function Login(){
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

      if(response){
        console.log(Response)
        toast.success("Success Notification",{position:toast.POSITION.TOP_RIGHT});
        localStorage.setItem('authenticated',true);
        navigate('/home/')
      }
      else{ 
         navigate('http://localhost:7793/')

      }
    }
return (<>
  <div className="form">
    <form onSubmit={HandleOnSubmit}>
      <div className="login__input">
        <label>Username</label>
        <input type="text" name="username"
          onChange={(u)=>setUsername(u.target.value)} required/>
        
      </div>
      <div className="login_password">
          <label>Password</label>
          <input type="password" name="password" 
          onChange={(p)=>setPassword(p.target.value)} required/>
      </div>
      </form> 
      <Button block size='lg' type='submit' disabled={!validateForm()}>Login</Button>
</div>
</>);

};

export default Login;

