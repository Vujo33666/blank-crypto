import React, { useState } from "react";
import styles from "./style.module.css";
import Mint from "../Mint/Mint";
import ExploreCard from "../ExploreCard/ExploreCard";
import CreateTokenCard from "../CreateTokenCard/CreateTokenCard";
import Transfer from "../Transfer/Transfer";

const Card = (props)=>{

    return(
        props.page ?
        <div className={styles.card}>
            {props.createToken ? 
                <CreateTokenCard 
                    title={props.title} 
                    history={props.page} 
                    content={props.content} 
                    userAddress={props.userAddress}
                    /> :
                <ExploreCard 
                    title={props.title} 
                    history={props.page} 
                    content={props.content} 
                    userAddress={props.userAddress}
                /> 
            }
        </div> :
        <div className={styles.card}>
            {props.selectedContract===undefined ?
                <div>
                    <h3>You can't make transactions</h3>
                    <p>Create a new token!</p>
                </div>
                 :
                [props.modal==="mint" ? 
                    <Mint 
                        title={props.title} 
                        content={props.content} 
                        userAddress={props.userAddress}
                        selectedContract={props.selectedContract}
                    /> :
                    <Transfer 
                        title={props.title} 
                        content={props.content} 
                        userAddress={props.userAddress}
                        selectedContract={props.selectedContract}
                    /> 
                ] 
            }
            
        </div>
            
    );
}

export default Card;