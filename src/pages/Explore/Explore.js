import React,{useState,useEffect} from "react";
import styles from "./style.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button, TextField} from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import WAValidator from "multicoin-address-validator";

const Explore = (props) =>{

    const [address,setAddress] = useState("");
    const [balance,setBalance] = useState(0);
    const [ethValue,setEthValue] = useState(0);

    function handleAddress(value){
        setAddress(value);
    }

    function handleBalance(){
        const getUser = JSON.parse(window.localStorage.getItem(address));
        if(getUser){
            setBalance(getUser.accBalance);
            setEthValue(getUser.value);
        }
        else if(EtherAddressValidator()===true){
            let obj=new Object();
            obj.id= localStorage.length;
            obj.user = address;
            obj.accBalance = Number(parseFloat(0).toFixed(8));
            //fixed ether price for now
            obj.value=Number(parseFloat(0).toFixed(2));
            obj.transactions=[];
            obj.transactionsSent=[];
            localStorage.setItem(address,JSON.stringify(obj));
            setBalance(0);
        }
    }

    function EtherAddressValidator(){
        let valid = WAValidator.validate(address, 'eth');
        if(valid){
            console.log('This is a valid address');
            return true;
        }
        else{
            console.log('Address INVALID');
            return false;
        }
    }

    useEffect(()=>{
        EtherAddressValidator();
    },[address]);

    return(
        <StylesProvider injectFirst>
        <div className={styles.main_container}>
            <Header userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Explore</h2>
            <div className={styles.container}>
            <TextField
                    required
                    id="outlined-basic"
                    label="Your address"
                    variant="outlined"
                    className={styles.fields}
                    name="address"
                    type="text"
                    value={address}
                    onChange={(event)=>handleAddress(event.target.value)}
                    >
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.button}
                    onClick={()=>{
                        handleBalance();
                        }}>Explore
                </Button>
                {balance ? 
                    <div>
                        <p>You have {balance.toFixed(8)} Ethereum coins</p>
                        <p>Account worth in $: {ethValue.toFixed(2)}</p>
                    </div> : 
                    <p>Enter an existing account</p>
                }
            </div>
            <Footer />
        </div>
        </StylesProvider>
    );
}

export default Explore;