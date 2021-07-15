import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import styles from "./style.module.css";
import NumericInput from 'material-ui-numeric-input';

export default function FormDialog(props) {

  const [open, setOpen] = useState(false);
  const [balance,setBalance] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addEthereum(){
    let findUser = JSON.parse(window.localStorage.getItem(props.userAddress));
    findUser.accBalance=parseFloat(findUser.accBalance);
    findUser.accBalance+=balance;
    console.log("finduser je " + findUser.accBalance);
    console.log("balance je " + balance);
    localStorage.setItem(props.userAddress, JSON.stringify(findUser));
    setOpen(false);
  }

  function checkForNumbers(value){
    setBalance(value);
  }

  /*function checkForNumbers(evt){
    let charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
  }*/

  return (
    <div>
      <AddIcon
        className={styles.button}
        onClick={handleClickOpen}>
      </AddIcon>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Mint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of Ethereum for buying.{props.userAddress}
          </DialogContentText>
          <NumericInput
            autoFocus
            margin="dense"
            id="name"
            label="Decimal number"
            type="number"
            fullWidth
            onChange={(e) => console.log(e.target.value)}
            value={1}
            name='example'
            precision='8'
            decimalSeparator=','
            thousandSeparator='.'
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addEthereum} color="primary">
            Mint
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
