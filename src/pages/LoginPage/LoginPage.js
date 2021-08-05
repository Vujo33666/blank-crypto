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

    /*let web3 = new Web3(new Web);
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        // web3 = new Web3(web3.currentProvider);
      }else{
          console.log("Install MetaMask!!!");
         //web3 = new Web3("http://localhost:3000/");
      }


    let contract = new web3.eth.Contract(abi,addressEthereum);
    console.log(contract.methods.name().call());*/



    /*contract.methods.getBalance().call().then(balance=>{
        console.log(balance);
    });
    web3.eth.getAccounts().then((accounts)=>{
        let acc=addressEthereum;
        console.log("Accoutn " + acc);
        return contract.methods.deposit(16).send({from: acc});
    }).then((data)=>{
        console.log("data je " + data);
    }).catch((text)=>{
        console.log("Cathceani text je " + text);
    })*/


    /*function handleSubmit(){
        let find=keys.filter(key=>{
            return key===addrEther
        });
        //user found in local storage
        if(find.length!==0 && addrEther.length>0){
            console.log("Old user");
        }
        else{
            console.log("New user");
            let obj=new Object();
            obj.id= localStorage.length;
            obj.user = addrEther;
            obj.accBalance = Number(parseFloat(Math.random()*10).toFixed(8));
            //fixed ether price for now
            obj.value=obj.accBalance * 1868.05;
            obj.transactions=[];
            obj.transactionsSent=[];
            localStorage.setItem(addrEther,JSON.stringify(obj));
        }
    }*/

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
                                //props.handleAddress(addrEther);
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