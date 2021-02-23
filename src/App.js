import React, {useState} from 'react';
import {isEmpty,size} from 'lodash';
import shortid from 'shortid';
function App() {


  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idT, setId] = useState("");
  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("task Empty");
      return;
    }
    const newTask = {
      id: shortid.generate(),
      name: task
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  const saveTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("task Empty");
      return;
    }
    const editTasks= tasks.map(item => item.id === idT ? {id: item.id, name: task} : item);
    setTasks(editTasks);
    setEditMode(false);
    setId("");
    console.log(tasks);
    setTask("");
    return;
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(tasks => tasks.id !== id );
    setTasks(filteredTasks);
  };

  const editTask = (theTask) => {
    setEditMode(true);
    setId(theTask.id);
    setTask(theTask.name)
  }



  return (
    <div className="container mt-5">
      <h1>Task</h1>
      <hr/>
      <div className="row">
      <div className="col-8">
        <h4 className="text-center">Task List</h4>
        <ul className="list-group">
          {
            size(tasks) === 0  ? (
                <li className="list-group-item" >
                    <span className="lead">No tasks found</span>
                </li>
            ) : (
               tasks.map(
                (task) => {
                return(  <li className="list-group-item" key={task.id} >
                      <span className="lead">{task.name}</span>
                      <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=> deleteTask(task.id) }>Delete</button>
                      <button className="btn btn-primary btn-sm float-right" onClick={()=> editTask(task)} >Edit</button>
                  </li>
               )
                }
            )
            )
         
          }
           
             
        </ul>
      
      </div>
      <div className="col-4">
        <h4 className="text-center">{ editMode == false ? "Add task" : "Edit task" }</h4>
        <form onSubmit={ editMode === false ? addTask : saveTask}>
          <input
          type="text"
          className="form-control mb-2"
          placeholder="Entry the task"
          onChange={(text)=> setTask(text.target.value) }
          value={task}
          />
          <button 
          className={ editMode == false ? "btn btn-dark btn-block" : "btn btn-danger btn-block" } 
          type="submit" >
          { editMode == false ? "Add" : "Edit" }
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
