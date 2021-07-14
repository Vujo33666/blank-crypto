import React from "react";
import styles from "./style.module.css";
import ExploreIcon from '@material-ui/icons/Explore';

const Card = (props)=>{
    return(
        <div className={styles.card}>
            <h1 className={styles.heading}>{props.title}</h1>
            <p className={styles.paragraph}>{props.content}</p>
            {props.explore ? 
                <ExploreIcon
                    className={styles.button}
                    onClick={()=>
                        props.explore.push("/explore")
                    }>
                </ExploreIcon> :
            null}
        </div>
    );
}

export default Card;