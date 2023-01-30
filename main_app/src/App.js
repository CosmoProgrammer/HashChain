import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Routes as Switch, Route } from 'react-router-dom';
import Login from './containers/login';

function App() {
    return (
      <>
      <Switch>
        <Route path="/" exact element={ <Login /> } />
      </Switch>
      </>
    );
  }
  
  export default App;
