import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAl5n_IoQA-Trk1eV6Ebrgtlols-t08NMw",
  authDomain: "remindable-3442b.firebaseapp.com",
  projectId: "remindable-3442b",
  storageBucket: "remindable-3442b.appspot.com",
  messagingSenderId: "233559750767",
  appId: "1:233559750767:web:23918f636cab42c63bf59a",
  measurementId: "G-2QEFBVG5CV"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { firebase, auth, db };