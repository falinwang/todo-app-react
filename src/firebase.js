import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDsPKjPQRBGChfBdxECsrRwYMNYfflfRwI",
  authDomain: "todo-app-2f592.firebaseapp.com",
  databaseURL: "https://todo-app-2f592.firebaseio.com",
  projectId: "todo-app-2f592",
  storageBucket: "todo-app-2f592.appspot.com",
  messagingSenderId: "280862294598",
  appId: "1:280862294598:web:b94b3015e51c5e151ac047",
  measurementId: "G-Q4LNFC65NY",
});

const db = firebaseApp.firestore();

export default db;
