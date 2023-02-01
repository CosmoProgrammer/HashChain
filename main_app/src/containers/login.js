import React,{useState} from "react";
import "../styles/style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

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
        const notify = () => toast("Invalid username or password"); 
        //porth put this notify in the tag for invalid


      }
      
    }

//JSX-need someone else to work on this

  return (<>
    <Form onSubmit={HandleOnSubmit}>
                <Form.Group size="lg" controlId="username" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autofocus type="text" value={username} onChange={(u)=>setUsername(u.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autofocus type="password" value={password} onChange={(p)=>setPassword(p.target.value)}/>
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!validateForm}>Login</Button>

            </Form>

    </>
    
  );
}

export default Login;

