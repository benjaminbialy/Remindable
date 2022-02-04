import './App.css';
import SignIn from './SignIn';
import { useState } from "react"
import { firebase } from "./firebaseConfig.js"
import SignOut from './SignOut';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged((user) => { 
    if(user){
      setAuthenticated(!authenticated);
    }
  })

  if( authenticated === false){
    return (
      <div className="App">
          <SignIn />
      </div>
    );
  }else{
    return(
      <div>
        <h1>Welcome.</h1>
        <SignOut />
      </div>
    )
  }
}

export default App;
