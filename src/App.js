import './App.css';
import SignIn from './SignIn';
import { useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig.js"
import SignOut from './SignOut.js';
import Task from './Task.js';
import AddTask, { added } from './AddTask.js';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);
  const [tasks, setTasks] = useState([])

  var tasksArray = [];
  var taskObject = {};


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

  // useEffect(() => {
  //   if(authenticated === true){
  //     const getTasks = () => {
  //       db.collection("users").doc(uid).collection("tasks")
  //       .orderBy("epochdate", "asc")
  //       .get()
  //       .then((querySnapshot) => {
  //           querySnapshot.forEach((doc) => {
              
  //             taskObject.taskname = doc.data().taskname
  //             taskObject.duedate = doc.data().duedate
              
  //             // gets epoch date value and stores it
  //             var epochDate = doc.data().epochdate;

  //             // gets current time
  //             const day = new Date();
  //             let currentTime = day.getTime();

  //             // finds time remaining in epoch 
  //             var timeRemaining = epochDate - currentTime;

  //             // finds how many days are left, rounds down and puts into object
  //             var daysLeft = (timeRemaining / 86400000)
  //             daysLeft = Math.floor(daysLeft)

  //             taskObject.duein = daysLeft;
  //             tasksArray.push(taskObject);
  //             setTasks(tasksArray);
  //           });
  //       })
  //       .catch((error) => {
  //           console.log("Error getting documents: ", error);
  //       });
  //     }
  //     getTasks();
  //     console.log("hiiiii")  
  //   }
  // }, [added]);
  

  useEffect(() => {
    if(authenticated === true){
      const getTasks = () => {
        db.collection("users").doc(uid).collection("tasks")
        .orderBy("epochdate", "asc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              taskObject.taskname = doc.data().taskname
              taskObject.duedate = doc.data().duedate
              
              // gets epoch date value and stores it
              var epochDate = doc.data().epochdate;

              // gets current time
              const day = new Date();
              let currentTime = day.getTime();

              // finds time remaining in epoch 
              var timeRemaining = epochDate - currentTime;

              // finds how many days are left, rounds down and puts into object
              var daysLeft = (timeRemaining / 86400000)
              daysLeft = Math.floor(daysLeft)

              taskObject.duein = daysLeft;
              tasksArray.push(taskObject);
            });
            setTasks(tasksArray);
            console.log(tasksArray)
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
            <h3>Simply enter your tasks name and due date and we'll do the rest!</h3>
            <Task 
              task__title="Business Management Test"
              days__away="4"
              due__date="2022-04-07"
            />
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
        <div>
          {tasks.map((task) => (
          <Task
            key={task}
            task__title={task.taskname}
            days__away={task.duein}
            due__date={task.duedate}
          />
        ))}
        </div>
      </div>
    )
  }
}

export default App;
