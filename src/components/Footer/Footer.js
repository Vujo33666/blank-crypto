import React from "react";
import styles from "./style.module.css";

function Footer(){

    const date=new Date();

    return(
        <footer>
            <p>Copyright &#169; {date.getFullYear()}. Created by Marko Vujnović</p>
        </footer>
    );
}

export default Footer;