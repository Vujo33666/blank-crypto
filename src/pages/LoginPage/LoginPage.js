import React, {useState,useEffect} from "react";
import {Button, TextField} from '@material-ui/core';
import logo from "../../ethereum.svg"
import login from "../../images/login.svg"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import auth from '../../auth';
import styles from './style.module.css'
import Cookies from "js-cookie";
import { StylesProvider } from "@material-ui/core/styles";

const LoginPage = (props) =>{

    const MySwal = withReactContent(Swal);
    const [validation,setValidation] = useState(false);
    const [addrEther,setAddrEther]=useState("");

    const ethereum = window.ethereum;
    if(ethereum){
        ethereum.on("accountsChanged",(accounts)=>{
            setAddrEther(accounts[0]);
        });
    }

    useEffect(()=>{
        ethereum ? setValidation(true) : setValidation(false);
        ethereum && setAddrEther(window.ethereum.selectedAddress);
    },[]);

    
    return (
        <StylesProvider injectFirst>
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
                            if(validation){
                                props.handleAddress(addrEther);
                                Cookies.set("address",addrEther);
                                auth.login(()=>{
                                    props.history.push("/dashboard");
                                });
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