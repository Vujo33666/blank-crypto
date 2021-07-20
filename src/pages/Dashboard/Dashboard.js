import React from "react";
import styles from './style.module.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";

const Dashboard = (props) =>{

    return (
        <div className={styles.main_container}>
            <Header page="dashboard" userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Dashboard</h2>
                <Cards 
                    history={props.history}
                    userAddress={props.userAddress}
                />
            <Footer />
        </div>
    );
}

export default Dashboard;