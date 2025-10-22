import type { Task } from "../App";
import { variablecontext } from "./Variablecontext";
import { useContext, useEffect, useState } from "react";

type viewtask = {
    tasks: Task[],
    settasks: React.Dispatch<React.SetStateAction<Task[]>>
};

export default function Addtasks({tasks, settasks}: viewtask){

    const context = useContext(variablecontext);
    if (!context) {
        throw new Error("Context not found");
    }

    const {date, setdate, title, settitle, description, setdescription, status, setstatus, msg, setmsg, isadded, setisadded} = context;
    const clear = () =>{
        setdate("");
        settitle("");
        setdescription("");
        setstatus("Pending");
    }
    
    useEffect(()=>{
        clear();
    }, []);

    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])


    return(
        <>
        <div className="body-1 mt-10">
            <form action="" onSubmit={(e)=>{
                    e.preventDefault(); 
                    const now = new Date();
                    now.setHours(0,0,0,0);
                    const selectedDate = new Date(date);
                    selectedDate.setHours(0,0,0,0);
                    if (selectedDate < now){
                        window.alert("Please select a future date");
                        return;
                    }
                    setmsg("Task added successfully");
                    setisadded(true);
                    setInterval(() => {
                        setisadded(false);
                        setmsg("");
                    }, 3000);
                    settasks([...tasks, {id: tasks.length>0 ? tasks.length+1 : 1, title:title, description:description, dueDate:date, status:status}])
                    setdate("");
                    settitle("");
                    setdescription("");
                    setstatus("Pending");
                }}>
                <div className="mb-5">
                    <label htmlFor="title" className="font-semibold text-[20px]">Title</label><br />
                    <input type="text" value={title} required onChange={(e)=>{settitle(e.target.value)}} id="title" className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="Description" className="font-semibold text-[20px]">Description</label><br />
                    <input type="text" value={description} required onChange={(e)=>{setdescription(e.target.value)}} id="Description" className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="Date" className="font-semibold text-[20px]">Due Date</label><br />
                    <input type="Date" value={date} id="Date" required onChange={(e)=>{setdate(e.target.value)}} className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="status" className="font-semibold text-[20px]">Set Status</label><br />
                    <select id="status" name="status" required value={status} onChange={(e)=>{setstatus(e.target.value as typeof status)}} className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md mb-3">
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>
                <button className="bg-[#08f] text-white px-5 py-2 hover:cursor-pointer mb-5 hover:bg-[#046ecc] rounded-xl" type="submit">Add Task</button>  
                <button className="bg-[#08f] text-white px-5 py-2 hover:cursor-pointer ml-5 mb-5 hover:bg-[#046ecc] rounded-xl" onClick={()=>{
                    localStorage.removeItem("tasks");
                    settasks([]);
                }}>Reset</button>
            </form>

            <div className={`mb-5 notify bg-green-300 text-green-900 px-5 py-2` + (isadded ? ' block' : ' hidden')}>
                {msg}
            </div>
        </div>
        </>
    );
}