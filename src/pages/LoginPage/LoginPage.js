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
    let keys= Object.keys(localStorage);
    const [address,setAddress] = useState("");
    const [validation,setValidation] = useState(false);

    function handleAddress(ethAddress){
        setAddress(ethAddress);
    }

    function handleSubmit(){
        let find=keys.filter(key=>{
            return key===address
        });
        //user found in local storage
        if(find.length!==0 && address.length>0){
            console.log("old user");
        }
        else {
            console.log("Invalid address, address not found");
        }
    }

    useEffect(()=>{
        let find=keys.filter(key=>{
            return key===address
        });
        find.length>0 ? setValidation(true) : setValidation(false);
    },[address]);

    return (
        <StylesProvider injectFirst>
            <div className={styles.main_container}>
                <img src={login} className={styles.login} alt="login"/>
                <div className={styles.container}>
                    <img src={logo} className={styles.logo} alt="logo" />
                    <h2 className={styles.heading}>Login</h2>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Your address"
                        variant="outlined"
                        className={styles.fields}
                        name="address"
                        type="text"
                        value={address}
                        onChange={(event)=>handleAddress(event.target.value)}>
                    </TextField>
                    {address ?
                        <Button
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={()=>{
                            handleSubmit();
                            if(validation){
                                props.handleAddress(address);
                                Cookies.set("user",address);
                                auth.login(()=>{
                                    props.history.push("/dashboard");
                                });
                            }else{
                                MySwal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Invalid address, try again!',
                                })
                            }
                        }}
                        >Sign in
                    </Button>
                    : <p>Enter your address</p>
                    }
                    
                </div>
            </div>
        </StylesProvider>
    );
}

export default LoginPage;