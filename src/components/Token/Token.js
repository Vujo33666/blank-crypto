import React,{useEffect, useState} from 'react';
import styles from './style.module.css'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Token(props) {

  const MySwal = withReactContent(Swal);

  function handleTokenCard(){
    MySwal.fire({
      title: `Do you want to use ${props.name} - ${props.symbol} token?`,
      text: `Maximum supply for ${props.name} token is ${props.supply}.`,
      showDenyButton: true,
      confirmButtonText: `Hell yeah`,
      denyButtonText: `Nope`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.changeContract(props.id);
        MySwal.fire({
          icon: 'success',
          title: 'Saved!',
          text: `Contract address: ${props.id}`,
          timer: 1500
        })
        localStorage.setItem("selectedContractFor_" + props.address, props.id);
      } else if (result.isDenied) {
        // MySwal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  // if(window.ethereum){
  //   window.ethereum.on("accountsChanged",(accounts)=>{
  //     localStorage.removeItem("selected_contract", props.id);
  //   });
  // }

  
    return (
      <div 
        className={props.selectedContract ? styles.active_token_card : styles.token_card} 
        //LOKAL:className={props.id === props.selectedToken ? styles.active_token_card : styles.token_card}
        onClick={handleTokenCard}
      >
        <AttachMoneyIcon className={styles.button}/>
        <p className={styles.paragraph}>{props.symbol}</p>
      </div>
    );
}
 