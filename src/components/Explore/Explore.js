import React,{useState} from "react";
import styles from "./style.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Button, TextField, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    root:{
          margin: "10px auto 10px",
          textTransform: "none"
    }
});

const Explore = (props) =>{

    const classes=useStyles();
    const [address,setAddress] = useState("");
    const [balance,setBalance] = useState(0);

    function handleAddress(value){
        setAddress(value);
    }

    function handleBalance(user){
        const getUser = JSON.parse(window.localStorage.getItem(user));
        if(getUser){
            setBalance(getUser.accBalance);
        }
        else{
            setBalance(0);
        }
    }

    return(
        <div className={styles.main_container}>
            <Header userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Explore</h2>
            <div className={styles.container}>
            <TextField
                    required
                    id="outlined-basic"
                    label="Your address"
                    variant="outlined"
                    className={[styles.fields,classes.root].join(" ")}
                    name="address"
                    type="text"
                    value={address}
                    onChange={(event)=>handleAddress(event.target.value)}
                    >
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    onClick={()=>{
                        handleBalance(address);
                        }}>Explore
                </Button>
                {balance ? <p>You have {balance.toFixed(8)} Ethereum coins</p> : <p>Enter an existing account</p>}
            </div>
            <Footer />
        </div>
    );
}

export default Explore;