import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import styles from "./style.module.css";
import { StylesProvider } from '@material-ui/core/styles';
import WAValidator from "multicoin-address-validator";
import Web3 from "web3";
const MyContract = require("./../../contracts/build/contracts/VujoBank.json");


export default function Transfer(props) {

  const findSenderUser = JSON.parse(window.localStorage.getItem(props.userAddress));
  const [open, setOpen] = useState(false);
  const [balance,setBalance] = useState(0);
  const [ethAddress,setEthAddress] = useState("");
  const [balanceError,setBalanceError] = useState(false);
  const [ethAddressError,setEthAddressError] = useState(false);
  const [transfer,setTransfer] = useState(true);
  const [addressTransfer, setAddressTransfer] = useState(false);

  let result;

  const deployedNetwork = MyContract.networks[4]; //fixed rinkeby network id
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
  const contract = new web3.eth.Contract(MyContract.abi,deployedNetwork.address);
  
  if(contract){
      contract.methods.getBalance().call().then(bal => {result = bal});
  }

  const handleClickOpen = () => {
    setOpen(true);
    setBalance(0);
  };

  const handleClose = () => {
    setOpen(false);
    setEthAddressError(false);
    setBalanceError(false);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    setEthAddressError(false);
    setBalanceError(false);

    if(ethAddress === ""){
      setEthAddressError(true)
    }
    if(balance === ""){
      setBalanceError(true)
    }
    if(ethAddress && EtherAddressValidator() && balance){
      sendEthereum();
    }
  }

  function handleBalance (value){
    setBalance(value);
  }

  function handleAddress (address){
    setEthAddress(address);
  }

  /*function transactionLogic(receiver){

    receiver.transactions.push({
      id: receiver.transactions.length,
      from: props.userAddress,
      howMany: parseFloat(balance),
    });

    findSenderUser.transactionsSent.push({
      id: findSenderUser.transactionsSent.length,
      howMany: parseFloat(balance),
      to: ethAddress
    });
    localStorage.setItem(props.userAddress, JSON.stringify(findSenderUser));

  }*/

  function EtherAddressValidator(){
    let valid = WAValidator.validate(ethAddress, 'eth');
    if(valid){
        console.log('This is a valid address');
        return true;
    }
    else{
        console.log('Address INVALID');
        return false;
    }
  }

  async function getAddresses(){
    let addresses = await web3.eth.getAccounts();
    console.log(addresses);
  }
  getAddresses();

  async function sendEthereum(){
    await web3.eth.sendTransaction({
      from: window.ethereum.selectedAddress,
      to: ethAddress,
      value: web3.utils.toWei(balance,"ether")
    });

  /* SLANJE PREMA CONTRACTU - depozit ili minting
  console.log("ADRESA : " + window.ethereum.selectedAddress)
  contract.methods.transferEther(balance).send({
    from: window.ethereum.selectedAddress,
  })
  .then(receipt=>{
    console.log("poslano od: " + receipt.from);
    console.log("adresa contract-a: " + receipt.to);
    console.log("RECEIPT");
    console.log(receipt);
  });*/

  setOpen(false);

    /*if(transfer===true){
      let findReceiverUser = JSON.parse(window.localStorage.getItem(ethAddress));

      if(findReceiverUser!==null){
        findReceiverUser.accBalance = parseFloat(findReceiverUser.accBalance) + parseFloat(balance);
        findReceiverUser.value=Number(findReceiverUser.accBalance)*1868.05;
        transactionLogic(findReceiverUser);
        localStorage.setItem(ethAddress, JSON.stringify(findReceiverUser));
      }else{
        let obj=new Object();
        obj.id= localStorage.length;
        obj.user = ethAddress;
        obj.accBalance = Number(parseFloat(balance).toFixed(8));
        //fixed ether price for now
        obj.value=obj.accBalance * 1868.05;
        obj.transactions=[];
        obj.transactionsSent=[];
        transactionLogic(obj);
        localStorage.setItem(ethAddress,JSON.stringify(obj));
      }
  
      let findSenderUser = JSON.parse(window.localStorage.getItem(props.userAddress));
      findSenderUser.accBalance = parseFloat(findSenderUser.accBalance) - parseFloat(balance);
      findSenderUser.value=Number(findSenderUser.accBalance)*1868.05;
      localStorage.setItem(props.userAddress, JSON.stringify(findSenderUser));
      setOpen(false);
    }else{
      setOpen(true);
    } */

  }

  /*useEffect(()=>{
    findSenderUser.accBalance >= balance ? setTransfer(true) : setTransfer(false);
},[balance]);*/

  useEffect(()=>{
    EtherAddressValidator() ? setAddressTransfer(true) : setAddressTransfer(false);
  },[ethAddress]);

  return (
    <div>
    <StylesProvider injectFirst>
      <div onClick={handleClickOpen}>
        <h1 className={styles.heading}>{props.title}</h1>
        <p className={styles.paragraph}>{props.content}</p>
        <AddIcon
          className={styles.button}
          onClick={handleClickOpen}
          >
        </AddIcon>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transfer</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
            Enter the amount of Ethereum for transfer and their address.
            </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Ethereum Address"
                type="text"
                required
                fullWidth
                onChange={(e) => handleAddress(e.target.value)}
                error={ethAddressError}
                className={styles.text_field}
              />

              <TextField 
                type="number" 
                name="price"
                InputProps={{
                    inputProps: { 
                        max: 100, min: 0.00000001, step: 0.10000000
                    }
                }}
                id="outlined-basic"
                label="Amount"
                variant="outlined" 
                required
                value={balance}
                onChange={(e) => handleBalance(e.target.value)}
                error={balanceError}
              >
              </TextField>

              {transfer===false ? <p>You do not have enough Ether, check out your account balance!</p> : null}
              {(addressTransfer === false && ethAddress.length > 0) ? <p>Invalid ethereum addres!</p> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back
            </Button>
            <Button type="submit" onClick={handleSubmit} color="primary">
              Transfer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      </StylesProvider>
    </div>
  );
}
