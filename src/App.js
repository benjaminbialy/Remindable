import './App.css';
import SignIn from './SignIn';
import { useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig.js"
import SignOut from './SignOut.js';
import Task from './Task.js';
import AddTask from './AddTask.js';
// import { doc, getDocs } from "firebase/firestore";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => { 
      if(user){
        return setAuthenticated(true);
      }else{
        return setAuthenticated(false);
      }
    })
  }, []);

  // const tasksCollection = doc(db, "tasks");


  // useEffect(() => {

  //   const getTasks = async () => {
  //     const data = await getDocs(tasksCollection);
  //     console.log(data);
  //   };
  //   getTasks();


  // }, []);
  


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
