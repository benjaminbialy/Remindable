import './App.css';
import SignIn from './SignIn';
import { useEffect, useState } from "react"
import { auth } from "./firebaseConfig.js"
import SignOut from './SignOut';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if(user){
        return setAuthenticated(true);
      }else{
        return setAuthenticated(false);
      }
    })
  }, []);
  


  if( authenticated === false){
    return (
      <div className="App">
        <h1>sign</h1>
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
