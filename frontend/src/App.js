import { useState, useEffect } from "react";
import useCategory from './composable/category'
import useTask from './composable/task'
import _ from 'lodash'
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { getCategories } = useCategory()
  const {store, update } = useTask()

  const createTask = async() => {
    
    try {
      const response = await store({name: newTask});
      const tempCategories = _.cloneDeep(categories);
      tempCategories[0].tasks.unshift(response.data);
      setNewTask('');
      setCategories(tempCategories);
    } catch (error) {
      if(error.response.status === 422)
       alert(error.response.data.errors.name[0])
    }
 }

  const onDragStart = (ev, task) => {
    ev.dataTransfer.setData('task', JSON.stringify(task));
  }

  const onDragOver = (ev) => {
     ev.preventDefault();
  }

  const onDrop = (ev, destinationId) => {
     ev.preventDefault();
     let sourceTask = JSON.parse(ev.dataTransfer.getData('task'));

     if(destinationId !== sourceTask.category_id)
     {
        const tempCategories = _.cloneDeep(categories);

        let categoryIndex = tempCategories.findIndex((category) => category.id === sourceTask.category_id);
        
        // FINDOUT REMOVE TASK INDEX
        let removeTaskIndex = tempCategories[categoryIndex].tasks.findIndex((task) => task.id === sourceTask.id);

        let removeTask = tempCategories[categoryIndex].tasks.splice(removeTaskIndex,1)         

        // update remove task category and push data destination category
        tempCategories.find((category) => category.id === destinationId).tasks.push({
          ...removeTask[0],
          category_id:destinationId
        });
       
        // task category update in server side
        update(removeTask[0],destinationId)

        setCategories(tempCategories);
     }
  }

  useEffect(() => {
  ( async () => {
    const response = await getCategories();
    setCategories(response)
  })()
  },[])

  return (
    <div className="container">
      <div className="kanban-heading marginY">
         <input value={newTask} onChange={(event) => setNewTask(event.target.value)} className='input' placeholder='write your task....'/>
         <button onClick={createTask} className='button'>Add</button>
      </div>
      <div className="kanban-board">
      {
            categories.map((category) => 
                <div className='board' key={category.id}
                onDragOver={(e)=> onDragOver(e)}
                onDrop={(e)=>{ onDrop(e, category.id)}}
                >
                    <div className="board-header">
                    <strong>{category.name}</strong>
                    </div>
                    <div className="board-body"
                    >
                    {
                        category.tasks.map((task) => 

                         <div key={task.id} className="task" 
                            onDragStart = {(e) => onDragStart(e, task)}
                            draggable
                        >
                            <span>{task.name}</span>
                        </div>
                    )}
                </div>
             </div>
            )
        }
      </div>
     </div>
  );
}

export default App;
