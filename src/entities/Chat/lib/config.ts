import  firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
export const app = firebase.initializeApp({
    apiKey: "AIzaSyCer49TzcNRuX4Rny5c0n1zCgjBjR-JX9M",
    authDomain: "carbuychat.firebaseapp.com",
    projectId: "carbuychat",
    storageBucket: "carbuychat.appspot.com",
    messagingSenderId: "417975911408",
    appId: "1:417975911408:web:4728f488f01b89e3761335"
})

export const storage = app.storage()
export const db = app.firestore()