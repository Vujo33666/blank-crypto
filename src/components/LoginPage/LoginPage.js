import React, {useState,useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import logo from "../../ethereum.svg"
import auth from '../../auth';
import styles from './style.module.css'
import Cookies from "js-cookie";

const LoginPage = (props) =>{

    let history=useHistory();

    const [address,setAddress] = useState("");

    function handleAddress(value){
        setAddress(value);
    }

    /*function readCookie(){
        const user = Cookies.get("user");
        if(user){
            setAuthentication(true);
        }
    }

    useEffect(()=>{
        readCookie();
    },[])*/

    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className={styles.heading}>Login page</h2>
            <input 
                name="address"
                placeholder="Enter your ETH address..."
                type="text"
                value={address}
                onChange={(event)=>handleAddress(event.target.value)}>
            </input>
            <button
                onClick={()=>{
                    
                   auth.login(()=>{
                        props.history.push("/dashboard");
                    });
                }}>Login button</button>
        </div>
    );
}

export default LoginPage;