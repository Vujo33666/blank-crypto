import React, { useState } from "react";
import styles from "./style.module.css";
import ExploreIcon from '@material-ui/icons/Explore';

const ExploreCard = (props)=>{

    return(
        <div onClick={()=>{
            props.history.push({
              pathname: '/explore',
              state: props.userAddress,
            });
        }}>
        <h1 className={styles.heading}>{props.title}</h1>
        <p className={styles.paragraph}>{props.content}</p>
        <ExploreIcon
          className={styles.button}
          >
        </ExploreIcon>
      </div>
    );
}

export default ExploreCard;