import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "date-reminder-489e8.firebaseapp.com",
  projectId: "date-reminder-489e8",
  storageBucket: "date-reminder-489e8.appspot.com",
  messagingSenderId: "129919998580",
  appId: "1:129919998580:web:a00c4372ea5a9fc6e30f21",
  measurementId: "G-6HFMYM5J6S"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { firebase, auth, db };