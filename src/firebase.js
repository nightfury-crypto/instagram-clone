import firebase from "firebase";


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB1WVxK8j7punjnE7yLg0cx9FCan9QtXmg",
    authDomain: "instagram-clone-7b744.firebaseapp.com",
    databaseURL: "https://instagram-clone-7b744.firebaseio.com",
    projectId: "instagram-clone-7b744",
    storageBucket: "instagram-clone-7b744.appspot.com",
    messagingSenderId: "348470796576",
    appId: "1:348470796576:web:4b8cb0fc9a164339677745",
    measurementId: "G-341P6L4587"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };



