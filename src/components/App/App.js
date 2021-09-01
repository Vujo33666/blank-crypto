import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import ProtectedRoute from "../../protected.route";
import LoginPage from '../../pages/LoginPage/LoginPage';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Explore from '../../pages/Explore/Explore';
import CreateToken from '../../pages/CreateToken/CreateToken';
import Cookies from 'js-cookie';


function App() {

  const [address,setAddress] = useState(Cookies.get('address'));

  function handleAddress(loginAddress){
    setAddress(loginAddress);
  }

  if(window.ethereum){
    window.ethereum.on("accountsChanged",(accounts)=>{
        handleAddress(accounts[0]);
        Cookies.set("address",accounts[0]);
    });
  }

  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path ="/" render={props=>(<LoginPage {...props} handleAddress={handleAddress}/>)}/>
            <ProtectedRoute exact path="/explore" component={Explore} userAddress={address}/>
            <ProtectedRoute exact path="/create-token" component={CreateToken} userAddress={address}/>
            <ProtectedRoute path ="*" component={Dashboard} userAddress={address}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;