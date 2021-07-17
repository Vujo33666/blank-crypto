import React from "react";
import logo from "../../ethereum.svg";
import styles from "./style.module.css";
import auth from '../../auth';
import LockIcon from '@material-ui/icons/Lock';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Header(props){

    const MySwal = withReactContent(Swal);

    return(
        <header className={styles.header}>
            <div className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo" />
                <h1>CryptoPro</h1>
            </div>
            {props.page==="dashboard" ?
                <div 
                    className={styles.container}
                        onClick={()=>{
                            MySwal.fire({
                            title: 'Are you sure?',
                            text: "You want to log out?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes!'
                            }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire(
                                'You log out!',
                                'Success'
                                )
                                auth.logout(()=>{
                                    props.userLogout.push("/");
                                });
                            }
                        })
                        }}
                    >
                    <h2>Account: {props.userAddress}</h2>
                        <LockIcon 
                        className={styles.logout}
                        >Logout
                    </LockIcon> 
                </div> :
                <div className={styles.container}>
                    <ArrowBackIcon
                        className={styles.back}
                        onClick={()=>{ props.userLogout.push("/dashboard") }}>
                    </ArrowBackIcon> 
                </div>
            }
        </header>
    );
}

export default Header;