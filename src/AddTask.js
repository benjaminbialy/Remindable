import React, { useState } from 'react';
import { db } from "./firebaseConfig.js"
import { addDoc, collection } from "firebase/firestore"

function AddTask() {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleAddTask = async (e) => {
        e.preventDefault();
        if(taskName !== ""){
             // Add a new document with a generated id.
            await addDoc(collection(db, "tasks"), {
              duedate: dueDate,
              taskname: taskName
            });
        };
        setTaskName("")
        setDueDate("")
    }

  return <div className='add__task'>
            <div>Add Task</div>
            <form onSubmit={(e) => { handleAddTask(e)}}>
                <input required 
                    type="text" 
                    value={taskName} 
                    placeholder='Task Name' 
                    onChange={(e)=> setTaskName(e.target.value)}
                >
                </input>
                <input required 
                    type="date"
                    onChange={(e)=> setDueDate(e.target.value)}
                >
                </input>
                <input type="submit" value="Add"></input>
            </form>
        </div>;
}

export default AddTask;