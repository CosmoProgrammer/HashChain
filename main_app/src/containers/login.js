import React,{useState} from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Login(){

    const showSuccessMessage = () => {
      toast.success("Succesfully Logged in!",{
        position:toast.POSITION.TOP_RIGHT,
      });
    }
    const showErrorMessage =()=>{
      toast.error('Enter valid credentials!',{
        position:toast.POSITION.TOP_RIGHT,
      })
    }

    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [submitted,setSubmitted] = useState(false);

    function validateForm(){
      return username.length >0 && password.length > 0;
    }
    if(!validateForm){
      const showInfo = () =>{
        toast.info("Please fill out the fields!",{
        position:toast.POSITION.TOP_RIGHT,
        })
      }
    }

    async function HandleOnSubmit(event){
      event.preventDefault();

      var credentials = {'username':username,'password':password};
      const response = await fetch('http://localhost:7793/login/'+JSON.stringify(credentials));
      console.log(response)

      if(response.ok){
        setSubmitted(true);
        localStorage.setItem('username',username);
        localStorage.setItem('authenticated',true);
        navigate('/home');
        console.log('Logged in!');
      }
      else{
        localStorage.setItem('authenticated',false);
        navigate('/nopagefound');
      }

    }

return (<>
<div className="home">
<div className="Aboutinfo">
      <h1>Sign In</h1>
      </div>
  <div className="form">
    <form onSubmit={HandleOnSubmit}>
      <div className="input-container">
        <label>Username</label>
        <input type="text" name="username"
          onChange={(u)=>setUsername(u.target.value)} required/>
        
      </div>
      <div className="password-container">
          <label>Password</label>
          <input type="password" name="password" 
          onChange={(p)=>setPassword(p.target.value)} required/>
      </div>
        <button onClick={submitted ? showSuccessMessage:showErrorMessage}>submit</button> 
      <ToastContainer />
      </form> 
      <div className="button-container">
        <input type="submit"/>
      </div>
</div>
</div>
</>);

};

export default Login;

