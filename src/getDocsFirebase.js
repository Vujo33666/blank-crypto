
import firebase from "./firebase";
import MyContract from "./contracts/build/contracts/PAToken.json";

let docs = [];

    function getDocs(address){
        
        const refToCollection = firebase.firestore().collection(address);
        while(docs.length>0){
            docs.pop();
        }

        refToCollection.onSnapshot((querySnap)=>{
            let i=0;
            querySnap.forEach((doc)=>{
                docs.push(doc.id);

            })
            
            if(docs.length===0){
                localStorage.setItem("initial_contract",MyContract.networks[4].address);
            }
            else{
                localStorage.setItem("initial_contract",docs[0]);
            }
        })
    }



export {getDocs,docs};