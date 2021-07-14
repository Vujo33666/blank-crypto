import React from "react";
import logo from "../../ethereum.svg";
import styles from "./style.module.css";
import auth from '../../auth';
import LockIcon from '@material-ui/icons/Lock';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";

function Header(props){
    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo" />
                <h1>CryptoPro</h1>
            </div>
            {props.page==="dashboard" ?
                <div className={styles.container}>
                    <h2>Account: {props.userAddress}</h2>
                        <LockIcon 
                        className={styles.logout}
                        onClick={()=>{
                            auth.logout(()=>{
                                props.userLogout.push("/");
                            });
                        }}>Logout
                    </LockIcon> 
                </div> :
                <div className={styles.container}>
                    <h2>Dashboard {props.userAddress}</h2>
                    <ArrowBackIcon
                        className={styles.back}
                        onClick={()=>{ props.userLogout.push("/dashboard") }}>
                    </ArrowBackIcon> 
                </div>
            }
        </header>
    );
}

export default Header;