import React from 'react';
import './Workspace.css';
import Working from '../Working/Working';
import Completed from '../Completed/Completed';


const WorkSpace = (props) => {
    
    var workingTasks= props.tasks.filter((workingTask)=>{
        return (workingTask.isCompleted===false && workingTask.projectKey===props.currentProjectId);
    })

    var completedTasks= props.tasks.filter((completedTask)=>{
        return (completedTask.isCompleted===true && completedTask.projectKey===props.currentProjectId);
    })
  

    return(
        <div className="workhere">
            <Working 
            //    handleTask={props.handleTask}
                handleAdd={props.handleAdd}
                currentText={props.currentText}
                tasks={workingTasks}
                updateCurrentText={props.updateCurrentText}
                handleDeleteTask={props.handleDeleteTask}
                handleCheckSquare={props.handleCheckSquare}
            />
            <Completed tasks={completedTasks}
                handleDeleteTask={props.handleDeleteTask}    
            />
        </div>
    )
}

export default WorkSpace;