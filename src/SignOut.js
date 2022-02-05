import { getAuth, signOut } from "firebase/auth";
import React from 'react';
import "./SignOut.css"

function SignOut() {
    const signOutWithGoogle = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
  return <div>
            <button className= "sign__out--button" onClick={() => { signOutWithGoogle()}}>Sign Out</button>
        </div>;
}

export default SignOut;
