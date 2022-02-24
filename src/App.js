import './App.css';
import SignIn from './SignIn';
import { useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig.js"
import SignOut from './SignOut.js';
import Task from './Task.js';
import AddTask from './AddTask.js';
import { doc, deleteDoc, documentId } from "firebase/firestore";


function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [uid, setUid] = useState(null);
  const [tasks, setTasks] = useState([])

  var tempTaskObject = {};
  var tempTaskArray = [];
  var docCount = 0;


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
        .orderBy("epochdate", "asc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

              tempTaskObject = {};

              // tempTaskObject is an empty object
              tempTaskObject.id = doc.id;
              tempTaskObject.taskname = doc.data().taskname;
              tempTaskObject.duedate = doc.data().duedate;
              tempTaskObject.number = docCount;
              
              docCount++

              // gets epoch date value and stores it
              var epochDate = doc.data().epochdate;

              // gets current time
              const day = new Date();
              let currentTime = day.getTime();

              // finds time remaining in epoch 
              var timeRemaining = epochDate - currentTime;

              // finds how many days are left and rounds down
              var daysLeft = (timeRemaining / 86400000)
              daysLeft = Math.floor(daysLeft)

              tempTaskObject.duein = daysLeft

              tempTaskArray.push(tempTaskObject)

            });
            setTasks(tempTaskArray)

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      }
      getTasks();
    }
  }, [authenticated, uid]);

  const deleteTask = (docID) =>{
    deleteDoc(doc(db, "users", uid, "tasks", tasks[docID].id));
  }


  if( authenticated === false){
    return (
      <div className="App">
            <SignIn />
            <h3 className='sign__in__desc'>Simply enter your tasks name and due date and we'll do the rest!</h3>
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
            key={task.id}
            taskID={task.number}
            task__title={task.taskname}
            due__date={task.duedate}
            days__away={task.duein}
            deleteTask={deleteTask}
          />
        ))}
        </div>
      </div>
    )
  }
}

export default App;
