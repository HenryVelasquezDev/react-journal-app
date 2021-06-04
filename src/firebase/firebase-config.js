import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = { //se debe establecer la configuración correspondiente de firebase acorde a la bd y registro realizado
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  export {
      db,
      googleAuthProvider,
      firebase
  }