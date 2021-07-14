import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import ProtectedRoute from "../../protected.route";
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import Cookies from 'js-cookie';
import auth from '../../auth';


function App() {

  const history=useHistory();
  const [authorize,setAuthorize] = useState(false);

  /*function handleAuth(address){
    console.log(address)
    if(address == "markoeth"){
      setAuthorize(true);
    }
  }*/

  return (
    <div className="App">
      <Router>

        <Switch>
        {/*
            Cookies.get('user')!=="YouLoggedIn" ?
            <Route exact path ="/" component={LoginPage}/> : 
            <ProtectedRoute exact path ="/dashboard" component={Dashboard} />
        */}
            <Route exact path ="/" component={LoginPage}/>
            <ProtectedRoute exact path="/explore" component={()=><h1>EXPLORE PAGE</h1>}/>
            <ProtectedRoute path ="*" component={Dashboard}/>
            
            
            
        </Switch>
      </Router>
    </div>
  );
}


export default App;
