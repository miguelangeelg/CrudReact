import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0NT3gO3xkKkj2Y40I4_1FDb8PAxAn2Sg",
    authDomain: "crudreact-8ef4f.firebaseapp.com",
    projectId: "crudreact-8ef4f",
    storageBucket: "crudreact-8ef4f.appspot.com",
    messagingSenderId: "948488837692",
    appId: "1:948488837692:web:45b9954a390712b5804139"
  };
 
  export const firebaseApp = firebase.initializeApp(firebaseConfig);