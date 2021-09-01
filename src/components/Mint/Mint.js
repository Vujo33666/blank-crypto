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
import Web3 from "web3";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import updateTokenFirebase from "../../updateTokenFirebase";
import MyContract from "./../../contracts/build/contracts/PAToken.json";
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Mint(props) {

  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [balanceError,setBalanceError] = useState(false);
  const [mintingAmount,setMintingAmount] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
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


    function handleBalance(){
        setMintingAmount(0);
    }

    function handleMintingAmount(value){
      setMintingAmount(value);
    }

  const handleClickOpen = () => {
    handleBalance();
    setOpen(true);
  };

  const handleClose = () => {
    handleBalance();
    setOpen(false);
    setBalanceError(false);
  };


  function handleNumericInput(){
    setBalanceError(false);
    if(mintingAmount === "" || mintingAmount===0){
      setBalanceError(true);
    }else{
      addEthereum();
      setIsLoading(true);
    }
  }

  function addEthereum(){
    contract.methods.mint(window.ethereum.selectedAddress,(parseFloat(mintingAmount).toFixed(8)*(10**8)).toString())
    .send({from:window.ethereum.selectedAddress})
    .then((data)=>{
      console.log("Mint:");
      console.log(data);
      //sending props.selectedContract bcs of normalCase letters
      updateTokenFirebase(data.from, props.selectedContract, (parseFloat(mintingAmount).toFixed(8)*(10**8)).toString());
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your minting is done',
        showConfirmButton: false,
        timer: 1500
      })
      setIsLoading(false);
    })
    .catch((err)=>{
      if(err.code===4001){
        MySwal.fire({
          icon: 'info',
          title: 'You canceled minting',
        })
      }
      setIsLoading(false);
    })
    handleBalance();
    setOpen(false);
  }

  return (
    <div>
      <div className="card-container" onClick={handleClickOpen}>
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
        <DialogTitle id="form-dialog-title">Mint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of Ethereum for buying.
            <br />
            Account:<br/>
            <p className={styles.address}>{props.userAddress}</p>
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
            value={mintingAmount}
            onChange={(e) => handleMintingAmount(e.target.value)}
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
