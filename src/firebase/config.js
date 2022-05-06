import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRQxF9FzowcwRz7DPc4R4nBFrnFLjR48c",
    authDomain: "food-delivery-7a99f.firebaseapp.com",
    databaseURL: "https://food-delivery-7a99f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "food-delivery-7a99f",
    storageBucket: "food-delivery-7a99f.appspot.com",
    messagingSenderId: "37736377979",
    appId: "1:37736377979:web:36be1a38980af0bb063cde",
    measurementId: "G-ZC148G3PP5"
  };
// const firebaseConfig = {
//   apiKey: "AIzaSyBZDlGjeDZXXLD0QyjQkR4umQVh5wQtPcg",
//   authDomain: "food-delivery-3-e4214.firebaseapp.com",
//   projectId: "food-delivery-3-e4214",
//   storageBucket: "food-delivery-3-e4214.appspot.com",
//   messagingSenderId: "959960527056",
//   appId: "1:959960527056:web:499d5a9af1f4612f192ed5",
// };

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
// timestamp
const timestamp = firebase.firestore.Timestamp;

export {
  projectAuth,
  projectFirestore,
  timestamp,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
