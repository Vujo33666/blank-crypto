import React from "react";
import styles from "./style.module.css";
import Card from "../Card/Card"


const Cards = (props)=>{

    return(
        <div className={styles.container}
        >
            <Card 
                    title="Explore"
                    content="Explore the amount of Ethereum"
                    explore={props.history}
            />
            <Card 
                    title="Mint"
                    content="Buy more Ethereum"
                    modal="mint"
                    userAddress={props.userAddress}
                    />
            <Card 
                    title="Transfer"
                    content="Transfer to someone"
                    modal="transfer"
                    userAddress={props.userAddress}
            />
        </div>
    );
}

export default Cards;