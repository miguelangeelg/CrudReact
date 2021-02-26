import React, {useState, useEffect} from 'react'; // hucks
import {isEmpty,size} from 'lodash';
import shortid from 'shortid';
import { getCollection, addTaskDB, updateDocument, deleteDocument } from './actions';
function App() {


  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idT, setId] = useState("");
  const [error, setError] = useState(null);

  

  useEffect(() => {
   // this metod will execute when the page is ready
   (async () => {
    const result = await getCollection("tasks");
    if (result.error == null ) {
      setTasks(result.data)
    }
    console.log(result);
   })()
  }, [])

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("you have entry a task");
      isValid = false;
    }
    return isValid;
  } 

  const addTask = async (e) => {
    e.preventDefault();
   
    if (!validForm()) {
      return;
    }

    /*
    const newTask = {
      id: shortid.generate(),
      name: task
    };
    */
   const newTask = {
    name: task
   };

   const result = await addTaskDB("tasks",newTask);
   if (result.statusR != true) {
    return;
   }
    newTask.id = result.data.id;
    setTasks([...tasks, newTask]);
    setTask("");
  }

  const saveTask = async(e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }
    const editTask     = {id:idT, name: task};
    const resultUpdate = await updateDocument("tasks",idT,editTask);
    if (resultUpdate.statusR != true) {
      return;
    }
    const editTasks= tasks.map(item => item.id === idT ? {id: item.id, name: editTask.name} : item);                                                                 
    setTasks(editTasks);
    setEditMode(false);
    setId("");
    console.log(tasks);
    setTask("");
    return;
  }

  const deleteTask = async(id) => {
    const resultDelete = await deleteDocument("tasks",id);
    if (resultDelete.statusR != true) {
      return;
    }
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
        <h4 className="text-center">{ editMode === false ? "Add task" : "Edit task" }</h4>
        <form onSubmit={ editMode === false ? addTask : saveTask}>
          <input
          type="text"
          className="form-control mb-2"
          placeholder="Entry the task"
          onChange={(text)=> setTask(text.target.value) }
          value={task}
          />
          {
            error != null && <div class="alert alert-danger mt-2 mb-2" role="alert">
            {error}
            </div> 
          }
          <button 
          className={ editMode === false ? "btn btn-dark btn-block" : "btn btn-danger btn-block" } 
          type="submit" >
          { editMode === false ? "Add" : "Edit" }
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
