import firebase from "./firebase";

const refToCollection = firebase.firestore();

export default function handleUpdateToken(address,contract,value){

        refToCollection
            .collection(address)
            .doc(contract)
            .update({
                token_supply:firebase.firestore.FieldValue.increment(parseFloat(value)/10**8)
        })
        .then(()=>{
            //     MySwal.fire({
            //         position: 'top-end',
            //         icon: 'success',
            //         title: 'Your successfully sent data to Firebase',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
                console.log("Updated max-supply in Firebase after minting!" )
        })
        .catch((err) => {
            console.error(err);
            //   MySwal.fire({
            //     icon: 'warning',
            //     title: 'You did not write the data to Firebase',
            //   })
        });
    
}