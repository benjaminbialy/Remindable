import './App.css';
import SignIn from './SignIn';
import { useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig.js"
import SignOut from './SignOut.js';
import Task from './Task.js';
import AddTask from './AddTask.js';
import { collection, getDocs } from "firebase/firestore";
import { DockSharp } from '@material-ui/icons';

// import { doc, getDocs } from "firebase/firestore";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  // const [tasks, setTasks] = useState("");
  const [uid, setUid] = useState(null);

var tasks = [];

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if(user){
        setUid(user.uid);
        return setAuthenticated(true);
      }else{
        return setAuthenticated(false);
      }
    })
  }, []);

  useEffect(() => {
    if(authenticated === true){
      const getTasks = () => {
        db.collection("users").doc(uid).collection("tasks")
        .get()
        .then((querySnapshot) => {
          var count = 0;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                tasks.push(doc.data().taskname)
                console.log(count)
                console.log(tasks)
                console.log("your task is: " + tasks[count])
                count += 1;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      }
      getTasks();
    }
  }, [authenticated, uid]);
  


  if( authenticated === false){
    return (
      <div className="App">
            <SignIn />
      </div>
    );
  }else{
    return(
      <div className='home__page'>
        <header className='home__page--header'>
          <h1>remindable.</h1>
          <SignOut />
        </header>
        <AddTask />
        <Task task__title="BUSMAN SAC 1 - Marketing" days__away="4" />
        <Task task__title="SWD - Weekly task" days__away="5" />
        <Task task__title="ENGLISH LANGUAGE AC" days__away="17" />
      </div>
    )
  }
}

export default App;
