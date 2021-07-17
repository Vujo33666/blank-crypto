import React from "react";
import styles from "./style.module.css";
import ExploreIcon from '@material-ui/icons/Explore';
import Mint from "../Mint/Demo";
import Transfer from "../Transfer/Demo";


const Card = (props)=>{

    return(
        <div className={styles.card}
            onClick={()=>{
                if(props.explore){
                    props.explore.push("/explore")
                }
            }}>
            <h1 className={styles.heading}>{props.title}</h1>
            <p className={styles.paragraph}>{props.content}</p>
            {props.explore ? 
                <ExploreIcon
                    className={styles.button}
                ></ExploreIcon> :
                (props.modal==="mint" ? <Mint userAddress={props.userAddress}/> : <Transfer userAddress={props.userAddress}/>)
            }
        </div>
    );
}

export default Card;