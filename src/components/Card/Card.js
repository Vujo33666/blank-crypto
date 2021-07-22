import React, { useState } from "react";
import styles from "./style.module.css";
import ExploreIcon from '@material-ui/icons/Explore';
import Mint from "../Mint/Mint";
import Transfer from "../Transfer/Transfer";

const Card = (props)=>{

    return(
        props.explore ? 
        <div className={styles.card}
            onClick={()=>{
                    props.explore.push("/explore");
            }}>
            <h1 className={styles.heading}>{props.title}</h1>
            <p className={styles.paragraph}>{props.content}</p>
            <ExploreIcon
                className={styles.button}
            ></ExploreIcon>
        </div> : 
        <div className={styles.card}>
            {props.modal==="mint" ? 
                <Mint title={props.title} content={props.content} userAddress={props.userAddress}/> :
                <Transfer title={props.title} content={props.content} userAddress={props.userAddress}/> 
            }
        </div>
            
    );
}

export default Card;