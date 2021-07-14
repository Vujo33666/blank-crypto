import React from "react";
import { Redirect,useHistory } from "react-router";
import auth from '../../auth';
import Cookies from "js-cookie";
import styles from './style.module.css'

const Dashboard = (props) =>{

    let history=useHistory();

    return (
        <div>
        {console.log("usli smo")}
            <h2 className={styles.heading}>Dashboard page</h2>
            <button onClick={()=>
                props.history.push("/explore")
            }>Explore</button>
            <button onClick={()=>{
                Cookies.remove("user");
                auth.logout(()=>{
                    props.history.push("/");
                });
            }}>Logout</button>
        </div>
    );
}

export default Dashboard;