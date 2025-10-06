import Viewtasks from './Components/Viewtasks'
import './App.css'
import Addtasks from './Components/Addtasks'
import { useState } from 'react'

export type Task = {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    status: string
};

function App(){
  
  let [tasks, settasks] = useState<Task[] | null>([]);

  return (
    <>
    <div className="app-body p-5 w-[600px]">
      <h1 className='text-3xl font-semibold'>Todo Application</h1>
      <Addtasks />
      <Viewtasks tasks={tasks} settasks={settasks}/>
    </div>
     
    </>
  )
}

export default App
