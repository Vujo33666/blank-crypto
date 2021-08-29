
import firebase from "./firebase";

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
            localStorage.setItem("initial_contract",docs[0])
        })
    }



export {getDocs,docs};