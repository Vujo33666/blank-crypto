import React from "react";
import styles from './style.module.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";

const Dashboard = (props) =>{

    return (
        <div className={styles.main_container}>
            <Header page="dashboard" userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Dashboard</h2>
            <div className={styles.container}>
                <Card 
                    title="Explore"
                    content="Explore the amount of Ethereum"
                    explore={props.history}
                />
                <Card 
                    title="Mint"
                    content="Buy more Ethereum"
                    modal="mint"
                    userAddress={props.userAddress}
                    />
                <Card 
                    title="Transfer"
                    content="Transfer to someone"
                    modal="transfer"
                    userAddress={props.userAddress}
                />
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;