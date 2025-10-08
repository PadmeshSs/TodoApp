import Viewtasks from './Components/Viewtasks'
import './App.css'
import Addtasks from './Components/Addtasks'
import { useState } from 'react'


export type Task = {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    status: "Pending" | "Completed" | "In Progress"
};


function App(){

  let [tasks, settasks] = useState<Task[]>(()=>{
    const savedTasks = localStorage.getItem("tasks");
    const now = new Date();
    now.setHours(0,0,0,0);
    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);
      for(let i = 0; i<parsedTasks.length; i++){
        const date = new Date(parsedTasks[i].dueDate);
        date.setHours(0,0,0,0);
        if(date < now){
          parsedTasks[i].status = "Pending";
        }
      }
      return parsedTasks;
    }
    return [];
  });

  return (
    <>
    <div className="app-body p-5 w-fit">
      <h1 className='text-3xl font-semibold'>Todo Application</h1>
      <Addtasks tasks={tasks} settasks={settasks}/>
      <Viewtasks tasks={tasks} settasks={settasks}/>
    </div>
     
    </>
  )
}

export default App
