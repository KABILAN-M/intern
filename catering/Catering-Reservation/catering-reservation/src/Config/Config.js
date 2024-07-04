import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseConfig = {
        apiKey: "AIzaSyBd0WImIHDv9St1FsFyrWcmbkq0LQzozVY",
        authDomain: "catering-dabaf.firebaseapp.com",
        databaseURL: "https://catering-dabaf-default-rtdb.firebaseio.com",
        projectId: "catering-dabaf",
        storageBucket: "catering-dabaf.appspot.com",
        messagingSenderId: "671074920511",
        appId: "1:671074920511:web:1d6fe8bfc47dff2bf4308a",
        measurementId: "G-KMM6SNR7FX"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }