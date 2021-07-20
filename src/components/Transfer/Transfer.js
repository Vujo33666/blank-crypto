import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import styles from "./style.module.css";

export default function Transfer(props) {

  const [open, setOpen] = useState(false);
  const [balance,setBalance] = useState(0);
  const [ethAddress,setEthAddress] = useState ("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleBalance (value){
    setBalance(value);
  }

  function handleAddress (address){
    setEthAddress(address);
  }

  function sendEthereum(){

    let findReceiverUser = JSON.parse(window.localStorage.getItem(ethAddress));

    if(findReceiverUser!==null){
      findReceiverUser.accBalance = parseFloat(findReceiverUser.accBalance) + parseFloat(balance);
      localStorage.setItem(ethAddress, JSON.stringify(findReceiverUser));
    }else{
      let obj=new Object();
      obj.id= localStorage.length;
      obj.user = ethAddress;
      obj.accBalance = parseFloat(balance).toFixed(8);
      //fixed ether price for now
      obj.value=obj.accBalance * 1868.05;
      obj.transactions=[];
      localStorage.setItem(ethAddress,JSON.stringify(obj));
    }


    let findSenderUser = JSON.parse(window.localStorage.getItem(props.userAddress));
    findSenderUser.accBalance = parseFloat(findSenderUser.accBalance) - parseFloat(balance);
    localStorage.setItem(props.userAddress, JSON.stringify(findSenderUser));
    setOpen(false);
  }

  return (
    <div>
      <AddIcon
        className={styles.button}
        onClick={handleClickOpen}>
      </AddIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transfer</DialogTitle>
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
            fullWidth
            onChange={(e) => handleAddress(e.target.value)}
          />
          <TextField 
            type="number" 
            required name="price"
            InputProps={{
                inputProps: { 
                    max: 100, min: 0.00000001, step: 0.10000000
                }
            }}
            id="outlined-basic"
            label="Amount"
            variant="outlined" 
            value={balance}
            onChange={(e) => handleBalance(e.target.value)}
          >
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button onClick={sendEthereum} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
