import React,{useState,useEffect} from "react";
import styles from "./style.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button} from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import Cookies from "js-cookie";
import Web3 from "web3";
import {addressEthereum, abi} from "../../connect_data";

const Explore = (props) =>{

    const address=Cookies.get("address");
    const [balance,setBalance] = useState(0);
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    let contract = new web3.eth.Contract(abi,addressEthereum);
    let result;
    
    if(contract){
        contract.methods.getBalance().call().then(bal => {result = bal});
    }
    
    function handleBalance(){
        setBalance(result);
    }


    return(
        <StylesProvider injectFirst>
        <div className={styles.main_container}>
            <Header userAddress={address} userLogout={props.history}/>
            <h2 className={styles.heading}>Explore</h2>
            <div className={styles.container}>
            <p className={styles.fields}>Your addres is: {address}</p>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.button}
                    onClick={()=>{
                        handleBalance();
                        }}>Explore
                </Button> 
                <div>
                    <p>You have {balance} Ethereum coins</p>
                    <p>Account worth in $: {(balance * 1868.05).toFixed(2)}</p>
                </div>
            </div>
            <Footer />
        </div>
        </StylesProvider>
    );
}

export default Explore;