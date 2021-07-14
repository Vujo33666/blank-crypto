import React, {useState,useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import {Button, TextField, makeStyles} from '@material-ui/core';
import logo from "../../ethereum.svg"
import login from "../../images/login.svg"
import circle from "../../images/circle.png"
import auth from '../../auth';
import styles from './style.module.css'
import Cookies from "js-cookie";

const useStyles = makeStyles({
    root:{
          margin: "10px auto 10px",
          textTransform: "none"
    }
});

const LoginPage = (props) =>{

    let history=useHistory();
    const classes=useStyles();
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
        <div className={styles.main_container}>
            <img src={login} className={styles.login} alt="login"/>
            <div className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo" />
                <h2 className={styles.heading}>Login</h2>
                <TextField 
                    id="outlined-basic"
                    label="Your address"
                    variant="outlined"
                    className={[styles.fields,classes.root].join(" ")}
                    name="address"
                    type="text"
                    value={address}
                    onChange={(event)=>handleAddress(event.target.value)}>
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={()=>{
                        
                    auth.login(()=>{
                            props.history.push("/dashboard");
                        });
                    }}>Sign in
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;