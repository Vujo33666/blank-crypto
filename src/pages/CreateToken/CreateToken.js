import React, { useState } from "react";
import styles from './style.module.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import firebase from "../../firebase.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from "react-router-dom";
import { CommonLoading } from 'react-loadingg';
import MyContract from "./../../contracts/build/contracts/PAToken.json";
import Web3 from "web3";

const CreateToken = (props) =>{

    const address=props.userAddress;
    let history = useHistory();
    const MySwal = withReactContent(Swal);
    const [name,setName] = useState("");
    const [supply,setSupply] = useState(0);
    const [symbol,setSymbol] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    const contract = new web3.eth.Contract(MyContract.abi,MyContract.networks[4].address);//fixed rinkeby
    const refToCollection = firebase.firestore();
    let accEth;
    handleBalance();

    async function handleBalance(){
        accEth = web3.utils.fromWei(await web3.eth.getBalance(address),"ether");
    }

    async function deployContract(data) {
        setIsLoading(true);
        const accounts = await web3.eth.getAccounts();
        console.log("deploying from: " + accounts[0]);
        contract.deploy({
                data: MyContract.bytecode,
                arguments: [name,symbol,parseInt(supply)]
        })
        .send({
                from: accounts[0],
                gas: 1500000,
                gasPrice: '30000000000'
        })
        .then((newContractInstance)=>{
            console.log("deployed to: " + newContractInstance.options.address);
            console.log(newContractInstance)
            let newContractAddress = newContractInstance.options.address;
            if(newContractAddress){
                refToCollection
                .collection(address)
                .doc(newContractAddress)
                .set(data)
                .then(()=>{
                    setIsLoading(false);
                    MySwal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your successfully sent data to Firebase',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(()=>{
                        history.push({
                            pathname: '/dashboard',
                            state: newContractAddress,
                          });
                    },1800);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.error(err);
                    MySwal.fire({
                        icon: 'warning',
                        title: 'You did not write the data to Firebase',
                    })
                })
            }else{
                setIsLoading(false);
                MySwal.fire({
                    icon: 'warning',
                    title: 'You did not deploy the SC to the network!',
                })
            }
            
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
            MySwal.fire({
                icon: 'info',
                title: 'You canceled SC deploy.',
              })
        });
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

    const onSubmit = (data) => {
        if(parseFloat(accEth)!==0){
            console.log("Data sent to Firebase: " + JSON.stringify(data));
            deployContract(data);
        }else{
            MySwal.fire({
                icon: 'info',
                title: 'You need ethers to deploy a contract.',
            })
        }
        console.log(accEth)
    }; 

    function handleName(result){
        setName(result);
    }
    function handleSupply(value){
        setSupply(value)
    }
    function handleSymbol(result){
        setSymbol(result.toUpperCase())
    }

    return (
        <div>
            <Header page="create-token" userAddress={props.userAddress} userLogout={props.history} disabled={isLoading}/>
            <h2 className={styles.heading}>CreateToken</h2>
            <div className={styles.container}>
            <StylesProvider injectFirst>
                <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="token_name"
                        label="Token name"
                        type="text"
                        {...register("token_name", { required: true })}
                        fullWidth
                        name="token_name"
                        onChange={(e) => handleName(e.target.value)}
                        value={name}
                        disabled={isLoading ? true : false}
                        className={styles.text_field}
                    />
                    {errors.token_name && <span className={styles.error_msg}>This field is required</span>}
                    <TextField
                        margin="dense"
                        id="token_symbol"
                        name="Token symbol"
                        label="Token symbol"
                        type="text"
                        {...register("token_symbol", { required: true })}
                        inputProps={{ maxLength: 4}}
                        fullWidth
                        value={symbol}
                        disabled={isLoading ? true : false}
                        onChange={(e) => handleSymbol(e.target.value)}
                        className={styles.text_field}
                    />
                    {errors.token_symbol && <span className={styles.error_msg}>This field is required</span>}
                    <TextField 
                        type="number" 
                        name="price"
                        className={styles.number_field}
                        InputProps={{
                            inputProps: { 
                                max: 1000000000000000000000000, min: 1, step: 10
                            }
                        }}
                        id="outlined-basic"
                        label="Max supply"
                        variant="outlined"
                        {...register("token_supply", { required: true })}
                        value={supply}
                        disabled={isLoading ? true : false}
                        onChange={(e) => handleSupply(e.target.value)}
                    />
                    {errors.token_supply && <span className={styles.error_msg}>This field is required</span>}
                    {
                        isLoading ? 
                            <CommonLoading color="#3f51b5"/> :
                            <Button 
                                className={styles.button} 
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Create
                            </Button>
                    }
                </form>
                <Footer />
                </StylesProvider>
            </div>
        </div>
    );
}

export default CreateToken;