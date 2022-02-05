import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import "./Task.css"

function Task(props) {
  return <div className='task'> 
            <h3 className='task--title'>{props.task__title}</h3>
            <h3>Due in {props.days__away} days</h3>
            <div className='task--buttons'>
                <EditIcon />
                <HighlightOffIcon />
            </div>
        </div>;
}

export default Task;
