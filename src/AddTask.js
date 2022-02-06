import React, { useState, useEffect } from 'react';
import { db, auth } from "./firebaseConfig.js"
import { addDoc, collection } from "firebase/firestore"
import "./AddTask.css"

function AddTask() {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [epochDate, setEpochDate] = useState(0)
    const [uid, setUid] = useState(null);

    auth.onAuthStateChanged((user) => { 
        if (user) {
        setUid(user.uid);
    } 
    });

    // variable used to pass the epoch date into state variable, "epochDate"
    var dueDateToEpoch = Date.parse(dueDate) 

    // useEffect watches for an epoch date to be calulated and then updates state of "epochDate"
    useEffect(() => {
        setEpochDate(dueDateToEpoch);
    }, [dueDateToEpoch]);

    const handleAddTask = async (e) => {
        e.preventDefault();

        if(taskName !== "" ){
             // Add a new document within the users -> user id -> tasks collection. 
             // This effectively allows for each user to have their own set of tasks.
            await addDoc(collection(db, "users", uid, "tasks"), {
              duedate: dueDate,
              taskname: taskName,
              epochdate: epochDate
            });
        };
        setTaskName("")
        setDueDate("")
    }


  return <div className='add__task'>
            <h2>Add Task</h2>
            <form className="add__task--form" onSubmit={(e) => { handleAddTask(e)}}>
                <input required 
                    type="text" 
                    value={taskName} 
                    placeholder='Enter Task Name' 
                    onChange={(e)=> setTaskName(e.target.value)}
                    className='add__task--box'
                >
                </input>
                <input required 
                    type="date"
                    onChange={(e)=> setDueDate(e.target.value)}
                    className='add__task--box'
                >
                </input>
                <input className='add__task--submit' type="submit" value="Add"></input>
            </form>
        </div>;
}

export default AddTask;
