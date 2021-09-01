import React,{useEffect, useState} from "react";
import styles from "./style.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Button} from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import Web3 from "web3";
import MyContract from "./../../contracts/build/contracts/PAToken.json";
import firebase from "../../firebase.js";
import Axios from 'axios';


const Explore = (props) =>{

    const address=props.userAddress;
    const [balanceEth,setBalanceEth] = useState(0);
    const [paragraph,setParagraph] = useState(false);
    const refToCollection=firebase.firestore().collection(address);
    const [resultTokens,setResultTokens] = useState([]);
    const [nameTokens,setNameTokens] = useState([]);
    let resultToken;
    let nameToken;
    let resultEth;
    const [coinbaseRates,setCoinbaseRates]=useState({
        "dollars": 0,
        "euros" : 0
    });
    
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    let contracts = [];
    
    function getContracts(){
        refToCollection.onSnapshot((querySnap)=>{
            querySnap.forEach((doc)=>{
                contracts.push(doc.id);
            });
            for(let i=0;i<contracts.length;i++){
                getContractData(contracts[i])
            }
            contracts.length=0;
        });

    }

    async function getContractData(contData){
        let cont = new web3.eth.Contract(MyContract.abi,contData);
        await cont.methods.balanceOf(address).call().then(bal => {
                resultToken=bal/(10**8);
                setResultTokens( prev => {
                    return [...prev, resultToken]
                })
        });
        await cont.methods.symbol().call().then(resultName => {
            nameToken=resultName
            setNameTokens( prev => {
                return [...prev, nameToken]
            })
        });
    }
    
    async function handleBalance(){
        resultEth = web3.utils.fromWei(await web3.eth.getBalance(address),"ether");
        setBalanceEth(resultEth);
        setParagraph(true);
    }

    //get data from coinbase api in USD and EUR 
    async function fetchCoinbasePriceData(){
        const response=await Axios('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
        setCoinbaseRates({
            "dollars": response.data.data.rates.USD,
            "euros": response.data.data.rates.EUR 
        })
    }

    useEffect(()=>{
        fetchCoinbasePriceData();
        getContracts();
    },[])


    return(
        <StylesProvider injectFirst>
        <div className={styles.main_container}>
            <Header userAddress={address} userLogout={props.history}/>
            <h2 className={styles.heading}>Explore</h2>
            <div className={styles.container}>
            <p className={styles.fields}>Your addres is: <br />{address}</p>
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
                        <p>Ethers on account: <strong>{parseFloat(balanceEth).toFixed(8)}</strong></p>
                        <p>Account worth in $: {(balanceEth * coinbaseRates.dollars).toFixed(2)}</p>
                        <p>Account worth in €: {(balanceEth * coinbaseRates.euros).toFixed(2)}</p>
                        {
                            resultTokens.map((token,index)=>
                                <p key={index}>
                                    {index+1}. token supply: <strong>{token.toFixed(8)}</strong> {nameTokens[index]}
                                </p>
                            )
                        }
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