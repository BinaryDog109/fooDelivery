// import firebase from "firebase/app"
import "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCRQxF9FzowcwRz7DPc4R4nBFrnFLjR48c",
    authDomain: "food-delivery-7a99f.firebaseapp.com",
    databaseURL: "https://food-delivery-7a99f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "food-delivery-7a99f",
    storageBucket: "food-delivery-7a99f.appspot.com",
    messagingSenderId: "37736377979",
    appId: "1:37736377979:web:36be1a38980af0bb063cde",
    measurementId: "G-ZC148G3PP5"
})

export const auth = app.auth()
export const db = app.firestore();
export default app
