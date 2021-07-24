import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from "../../protected.route";
import LoginPage from '../../pages/LoginPage/LoginPage';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Explore from '../../pages/Explore/Explore';
import Cookies from 'js-cookie';


function App() {

  const [address,setAddress] = useState(Cookies.get('address'));

  function handleAddress(loginAddress){
    setAddress(loginAddress);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path ="/" render={props=>(<LoginPage {...props} handleAddress={handleAddress}/>)}/>
            <ProtectedRoute exact path="/explore" component={Explore}/>
            <ProtectedRoute path ="*" component={Dashboard} userAddress={address}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
