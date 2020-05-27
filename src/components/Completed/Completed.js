import React from 'react';
import './Completed.css';
import { faTrash ,faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Completed = (props) => {
    
    var tasklist = props.tasks.map((task)=>{
        return <button key={task.taskKey}>

                    <span className="trash">
                    <FontAwesomeIcon icon={ faTrash } 
                            size='1x'
                            onClick={()=>props.handleDeleteTask(task.taskKey)} 
                        />    
                    </span>
                    {task.text}
                    
                </button>
    })
    
    return (
        <div className="completed">
            <h1 className="header1">COMPLETED</h1>
            <div id="taskprint">
                
                {tasklist}
                
            </div>
        </div>
    )
}

export default Completed;