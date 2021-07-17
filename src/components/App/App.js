import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import ProtectedRoute from "../../protected.route";
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import Explore from '../Explore/Explore';
import Cookies from 'js-cookie';
import auth from '../../auth';


function App() {

  const [authorize,setAuthorize] = useState(false);
  const [address,setAddress] = useState(Cookies.get('user'));

  /*function handleAuth(address){
    console.log(address)
    if(address == "markoeth"){
      setAuthorize(true);
    }
  }*/

  function handleAddress(loginAddress){
    setAddress(loginAddress);
  }

  return (
    <div className="App">
      <Router>

        <Switch>
        {/*
            Cookies.get('user')!=="YouLoggedIn" ?
            <Route exact path ="/" component={LoginPage}/> : 
            <ProtectedRoute exact path ="/dashboard" component={Dashboard} />
        */}
            <Route exact path ="/" render={props=>(<LoginPage {...props} handleAddress={handleAddress}/>)}/>
            <ProtectedRoute exact path="/explore" component={Explore}/>
            <ProtectedRoute path ="*" component={Dashboard} userAddress={address}/>
            
        </Switch>
      </Router>
    </div>
  );
}


export default App;
