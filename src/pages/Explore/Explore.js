import React,{useState,useEffect} from "react";
import styles from "./style.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button} from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import Cookies from "js-cookie";
import Web3 from "web3";
const MyContract = require("./../../contracts/build/contracts/PAToken.json");

const Explore = (props) =>{

    const address=Cookies.get("address");
    const [balance,setBalance] = useState(0);
    const [balanceEth,setBalanceEth] = useState(0);
    const [paragraph,setParagraph] = useState(false);
    let resultToken;
    let resultEth;
 

    const deployedNetwork = MyContract.networks[4]; //fixed rinkeby network id
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    const contract = new web3.eth.Contract(MyContract.abi,deployedNetwork.address);
    
    if(contract){
       contract.methods.balanceOf(address).call().then(bal => {
           resultToken = bal
        });
    }
    
    async function handleBalance(){
        resultEth = web3.utils.fromWei(await web3.eth.getBalance(address),"ether");
        setBalance(resultToken);
        setBalanceEth(resultEth);
        setParagraph(true);
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
                {paragraph ? 
                    <div>
                        <p>You have {balance} MVT tokens</p>
                        <p>Ethers on account: {parseFloat(balanceEth).toFixed(8)}</p>
                        <p>Account worth in $: {(balanceEth * 1868.05).toFixed(2)}</p>
                    </div> :
                    null
                }
                </div>
            </div>
            <Footer />
        </div>
        </StylesProvider>
    );
}

export default Explore;