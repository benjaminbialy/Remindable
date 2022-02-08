import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import "./Task.css"


function Task(props, {task, toggleComplete, deleteTask, handleEdit}) {

  return <div className='task'> 
            <h3 className='task--title'>{props.task__title}</h3>
            <h3>In {props.days__away} days</h3>
            <h3>Due date: {props.due__date}</h3>
            <div className='task--buttons'>
                {/* <EditIcon /> */}
                <IconButton onClick={() => deleteTask }>
                    <HighlightOffIcon />    
                </IconButton>
            </div>
        </div>;
}

export default Task;
