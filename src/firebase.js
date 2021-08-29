//  The core Firebase JS SDK is always required and must be listed first 
// <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>

//  TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries 
// <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js"></script>

import firebase from "firebase/app";
import "firebase/firestore";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCPovn9PldGrH_yK3ueZ38DCprI62jI4tM",
    authDomain: "blank-crypto.firebaseapp.com",
    projectId: "blank-crypto",
    storageBucket: "blank-crypto.appspot.com",
    messagingSenderId: "1046444583625",
    appId: "1:1046444583625:web:27a3910f30617cbd23fb18",
    measurementId: "G-XK34JLE5X3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase;
