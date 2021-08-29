import React, { useState } from "react";
import styles from "./style.module.css";
import AddIcon from '@material-ui/icons/Add';

const CreateTokenCard = (props)=>{

    return(
        <div onClick={()=>{
            props.history.push({
              pathname: '/create-token',
              state: props.userAddress,
            });
        }}>
        <h1 className={styles.heading}>{props.title}</h1>
        <p className={styles.paragraph}>{props.content}</p>
        <AddIcon
          className={styles.button}
          >
        </AddIcon>
      </div>
    );
}

export default CreateTokenCard;