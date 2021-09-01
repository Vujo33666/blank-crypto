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
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MyContract from "./../../contracts/build/contracts/PAToken.json";
import CircularProgress from '@material-ui/core/CircularProgress';
import setTokenFirebase from "../../setTokenFirebase";


export default function Transfer(props) {

  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [balance,setBalance] = useState(0);
  const [ethAddress,setEthAddress] = useState("");
  const [balanceError,setBalanceError] = useState(false);
  const [ethAddressError,setEthAddressError] = useState(false);
  const [transfer,setTransfer] = useState(false);
  const [addressTransfer, setAddressTransfer] = useState(false);
  const [balanceOf,setBalanceOf] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [transferYourself,setTransferYourself] = useState(false);
  const [nameFirebase,setNameFirebase] = useState("");
  const [symbolFirebase,setSymbolFirebase] = useState("");
  let contractAddressWeb3;
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
  //get selectedContracts from Tokens via Dashboard and Cards
  //and checking if it is a new account on metamask
  if(props.selectedContract===undefined){
    contractAddressWeb3=MyContract.networks[4].address;
  }
  else{
    contractAddressWeb3=props.selectedContract;
  }
  const contract = new web3.eth.Contract(MyContract.abi,contractAddressWeb3);
  
  if(contract){
    contract.methods.balanceOf(props.userAddress).call().then(bal => {
      setBalanceOf(bal/(10**8));
   });
    contract.methods.name().call().then(result => {
      setNameFirebase(result);
    });
    contract.methods.symbol().call().then(result => {
      setSymbolFirebase(result);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
    setBalance(0);
    setBalanceError(false);
    setTransferYourself(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEthAddressError(false);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    setEthAddressError(false);

    if(ethAddress === ""){
      setEthAddressError(true)
    }
    if(balance === "" || parseFloat(balance) === 0){
      setBalanceError(true)
    }
    if(transfer){
      setBalanceError(true)
    }
    if(ethAddress.toLowerCase() === window.ethereum.selectedAddress){
      setTransferYourself(true);
    }
    if(ethAddress && EtherAddressValidator() && transfer && !transferYourself){
      sendEthereum();
      setIsLoading(true);
    }
  }

  function handleBalance (value){
    setBalance(value);
  }

  function handleAddress (address){
    setEthAddress(address);
  }

  function EtherAddressValidator(){
    let valid = WAValidator.validate(ethAddress, 'eth');
    if(valid){
        return true;
    }
    else{
        return false;
    }
  }

  function sendEthereum(){
    contract.methods.transfer(ethAddress,(parseFloat(balance).toFixed(8)*(10**8)).toString())
      .send({ from: window.ethereum.selectedAddress })
      .then((data)=>{
        console.log("Transfer:");
        console.log(data);
        MySwal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your transfer is done',
          showConfirmButton: false,
          timer: 1500
        })
        setIsLoading(false);
        //  sending to update firebase: ethAddress from input, selectedContract from dashboard and balance from numberInput, name and symbol from SC
        setTokenFirebase(ethAddress.toLowerCase(), props.selectedContract, nameFirebase,(parseFloat(balance).toFixed(8)*(10**8)).toString(), symbolFirebase);
      })
      .catch((err)=>{
        console.log(err);
        if(err.code===4001){
          MySwal.fire({
            icon: 'info',
            title: 'You canceled transfer',
          })
        }
        else{
          MySwal.fire({
            icon: 'warning',
            title: 'Transfer error',
          })
        }
        setIsLoading(false);
      });
    
    setOpen(false);
  }

  useEffect(()=>{
    (parseFloat(balanceOf) >= balance) ? setTransfer(true) : setTransfer(false);
  },[balance]);

  useEffect(()=>{
    EtherAddressValidator() ? setAddressTransfer(true) : setAddressTransfer(false);
    window.ethereum.selectedAddress === (ethAddress.toLowerCase()) ? setTransferYourself(true) : setTransferYourself(false);
    
  },[ethAddress]);
  
  return (
    <div>
    <StylesProvider injectFirst>
      <div onClick={handleClickOpen}>
        <h1 className={styles.heading}>{props.title}</h1>
        <p className={styles.paragraph}>{props.content}</p>
        {
          isLoading ?
          <CircularProgress /> :
          <AddIcon
            className={styles.button}
            onClick={handleClickOpen}
            >
          </AddIcon>
        }
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
              {transfer===false ? <p>You do not have enough tokens, check out your account balance!</p> : null}
              {(addressTransfer === false && ethAddress.length > 0) ? <p>Invalid ethereum addres!</p> : null}
              {transferYourself ? <p>You can't transfer to yourslef!</p> : null}
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
