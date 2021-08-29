import React, {useEffect, useState} from "react";
import styles from './style.module.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import Tokens from "../../components/Tokens/Tokens";
import {getDocs,docs} from '../../getDocsFirebase';

const Dashboard = (props) =>{


    const [selectedContract,setSelectedContract] = useState(
            localStorage.getItem("initial_contract")
        )

    function handleContract(contract_id){
        setSelectedContract(contract_id)
    }

    return (
        <div className={styles.main_container}>
            <Header page="dashboard" userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>Dashboard</h2>
                <Cards 
                   history={props.history}
                    userAddress={props.userAddress}
                    selectedContract={selectedContract}
                />
                <Tokens 
                    userAddress={props.userAddress}
                    handleContract={handleContract}
                    selectedContract={selectedContract}
                />
            <Footer />
        </div>
    );
}

export default Dashboard;