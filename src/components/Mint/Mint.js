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

export default function Mint(props) {

  const [open, setOpen] = useState(false);
  const [balance,setBalance] = useState(0);
  const [balanceError,setBalanceError] = useState(false);

  const handleClickOpen = () => {
    setBalance(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBalanceError(false);
  };

  function handleBalance (value){
    setBalance(value);
  }

  function handleNumericInput(){
    setBalanceError(false);
    if(balance === ""){
      setBalanceError(true);
    }else{
      addEthereum();
    }
  }

  function addEthereum(){
    let findUser = JSON.parse(window.localStorage.getItem(props.userAddress));
    findUser.accBalance = parseFloat(findUser.accBalance) + parseFloat(balance);
    findUser.value=Number(findUser.accBalance)*1868.05;
    localStorage.setItem(props.userAddress, JSON.stringify(findUser));
    setOpen(false);
  }

  return (
    <div>
      <div className="card-container" onClick={handleClickOpen}>
        <h1 className={styles.heading}>{props.title}</h1>
        <p className={styles.paragraph}>{props.content}</p>
        <AddIcon
          className={styles.button}
          onClick={handleClickOpen}
          >
        </AddIcon>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Mint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of Ethereum for buying.
            <br />
            Account: {props.userAddress}
          </DialogContentText>
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
            error={balanceError}
          >
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNumericInput} color="primary">
            Mint
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
