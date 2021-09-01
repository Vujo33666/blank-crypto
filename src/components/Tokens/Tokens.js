import React,{useState,useEffect} from "react";
import styles from './style.module.css'
import firebase from "../../firebase.js";
import Token from "../Token/Token";
import Web3 from "web3";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cookies from 'js-cookie';

const Tokens = (props) =>{

    const MySwal = withReactContent(Swal);
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    const address=props.userAddress;
    const [tokens,setTokens] = useState([]);
    const [selectedToken,setSelectedToken] = useState()

    function getTokens(){
        const ref=firebase.firestore().collection(address);
        ref.onSnapshot((querySnap)=>{
            const items = [];
            querySnap.forEach((doc)=>{
                items.push({token_id: doc.id, ...doc.data()});
            });
            if(items.length!==0){
                setTokens(items);
                changeContract(
                    localStorage.getItem("selectedContractFor_" + address) || items[0].token_id
                    )
            }else{
                setTokens([])
                props.handleContract(undefined)
                MySwal.fire({
                    icon: 'warning',
                    title: "There are no contracts for this account, create a new one!",
                    text: "Also get some Ether for deploying!"
                });
            }

        })

    }

    function changeContract(token_id){
        setSelectedToken(token_id);
        props.handleContract(token_id);
    }

    useEffect(()=>{
        getTokens();  
    },[address])

    function checkContract(token){
        if(selectedToken === token)
            return true;
        else
            return false;
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Your tokens</h2>
            {
                tokens.length === 0 ?
                    <p>Create a new smart contract clicking on Create Token card!</p>
                    :
                    <p>Make transactions with one of the contracts below!</p>
            }
            <div className={styles.token_container}>
                {tokens.map((token)=>
                    <Token
                        id={token.token_id}
                        key={token.token_id}
                        address={address}
                        name={token.token_name}
                        symbol={token.token_symbol}
                        supply={token.token_supply}
                        selectedContract={checkContract(token.token_id)}
                        selectedToken={selectedToken}
                        changeContract={changeContract}
                    />
                )}
            </div>
        </div>
    );
}

export default Tokens;