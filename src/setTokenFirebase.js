import Web3 from "web3";
import firebase from "./firebase";
import MyContract from "./contracts/build/contracts/PAToken.json"

const refToCollection = firebase.firestore();

export default function setTokenFirebase(address,sentContract,name,supply,symbol){

    const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
    //get selectedContracts from Tokens via Dashboard and Cards
    const contract = new web3.eth.Contract(MyContract.abi,sentContract);
    console.log("DOBILI SMO: " + name + " sym: " + symbol)
    refToCollection
            .collection(address)
            .doc(sentContract)
            .set({
                token_name: name,
                token_supply:parseFloat(supply)/10**8,
                token_symbol: symbol
        })
        .then(()=>{
                console.log("Data added to Firebase!" )
        })
        .catch((err) => {
            console.error(err);
        });

}