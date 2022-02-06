import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./SignIn.css"

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
  return <div className='signin'>
            <div className='signin--header'>
                <h1>Welcome to remindable,</h1>
                <h3>the most easy and practical planning solution there is.</h3>
            </div>
            <div className='signin--prompt'>
                <h2>To proceed to the tool, sign in below</h2>
                <button className='black--button' onClick={() => { signInWithGoogle()}}>Sign In With Google</button>
            </div>
        </div>;
}

export default SignIn;
