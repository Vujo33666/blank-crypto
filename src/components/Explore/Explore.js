import React from "react";
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

    return(
        <div className={styles.main_container}>
            <Header userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Explore</h2>
            <div className={styles.container}>
            <TextField 
                    id="outlined-basic"
                    label="Your address"
                    variant="outlined"
                    className={[styles.fields,classes.root].join(" ")}
                    name="address"
                    type="text"
                    >
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.root}
                    >Explore
                </Button>
            </div>
            <Footer />
        </div>
    );
}

export default Explore;