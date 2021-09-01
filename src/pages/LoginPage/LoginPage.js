import React, {useState,useEffect} from "react";
import {Button, Link} from '@material-ui/core';
import logo from "../../ethereum.svg"
import login from "../../images/login.svg"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import auth from '../../auth';
import styles from './style.module.css'
import Cookies from "js-cookie";
import { StylesProvider } from "@material-ui/core/styles";
import {getDocs,docs} from '../../getDocsFirebase';
import { Redirect, Route } from "react-router";

const LoginPage = (props) =>{

    const MySwal = withReactContent(Swal);
    const [validation,setValidation] = useState(false);
    const [walletValidation,setWalletValidation] = useState(false);
    const [addrEther,setAddrEther]=useState("");
    const ethereum = window.ethereum;

    if(ethereum){
        ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            console.error(err);
        });
    }

    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
          setWalletValidation(false);
        } else if (accounts[0] !== addrEther) {
          setAddrEther(accounts[0]);
          setWalletValidation(true);
        }
      }


    useEffect(()=>{
        ethereum ? setValidation(true) : setValidation(false);
    },[ethereum]);

    
    return (
        <StylesProvider injectFirst>
            {/* redirect if user is authenticated */}
            {/* {Cookies.get("address") && <Redirect to="/dashboard" />} */}
            <div className={styles.main_container}>
                <img src={login} className={styles.login} alt="login"/>
                <div className={styles.container}>
                    <img src={logo} className={styles.logo} alt="logo" />
                    <h2 className={styles.heading}>Login</h2>
                        <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={()=>{
                            if(validation && walletValidation){
                                props.handleAddress(addrEther);
                                Cookies.set("address",addrEther);
                                getDocs(addrEther);
                                auth.login(()=>{
                                    setTimeout(()=>
                                        props.history.push("/dashboard"),1000);
                                    });
                            }else if(validation){
                                MySwal.fire({
                                    icon: 'info',
                                    title: 'Oops...',
                                    text: 'Connect with one MetaMask account and refresh!',
                                })
                                ethereum.enable();
                            }else{
                                MySwal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Install MetaMask extension for your browser!',
                                })
                            }
                        }}
                        >Sign in with MetaMask
                    </Button>
                </div>
            </div>
        </StylesProvider>
    );
}

export default LoginPage;