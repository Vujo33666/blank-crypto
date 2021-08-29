import React from "react";
import styles from "./style.module.css";
import Card from "../Card/Card"


const Cards = (props)=>{

    return(
        <div className={styles.container}>
                <Card 
                        key="explore"    
                        title="Explore"
                        content="Explore the amount of tokens"
                        page={props.history}
                        userAddress={props.userAddress}
                />
                <Card 
                        key="mint"   
                        title="Mint"
                        content="Mint more tokens"
                        modal="mint"
                        userAddress={props.userAddress}
                        selectedContract={props.selectedContract}
                />
                <Card 
                        key="transfer"
                        title="Transfer"
                        content="Transfer to someone"
                        modal="transfer"
                        userAddress={props.userAddress}
                        selectedContract={props.selectedContract}
                />
                <Card 
                        key="create-token"
                        title="Create Token"
                        content="Create a new token"
                        page={props.history}
                        userAddress={props.userAddress}
                        createToken={true}
                />
        </div>
    );
}

export default Cards;