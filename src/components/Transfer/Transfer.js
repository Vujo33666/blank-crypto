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


  const deployedNetwork = MyContract.networks[4]; //fixed rinkeby network id
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000/');
  const contract = new web3.eth.Contract(MyContract.abi,deployedNetwork.address);
  
  if(contract){
    contract.methods.balanceOf(window.ethereum.selectedAddress).call().then(bal => {
      setBalanceOf(bal/(10**8));
   });
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
    if(balance === "" || parseFloat(balance) === 0){
      setBalanceError(true)
    }
    if(transfer){
      setBalanceError(true)
    }
    if(ethAddress && EtherAddressValidator() && transfer){
      sendEthereum();
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
    contract.methods.transfer(ethAddress,parseFloat(balance).toFixed(8)*(10**8))
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
      })
      .catch((err)=>{
        console.log(err);
        if(err.code===4001){
          MySwal.fire({
            icon: 'info',
            title: 'You canceled minting PAT',
          })
        }
        else{
          MySwal.fire({
            icon: 'warning',
            title: 'Transfer error',
          })
        }
      });
    
    setOpen(false);

  }

  useEffect(()=>{
    (parseFloat(balanceOf) >= balance) ? setTransfer(true) : setTransfer(false);
  },[balance]);

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
