import {variablecontext} from "../Components/Variablecontext";
import { useContext, useState, useEffect } from "react";
import type { Task } from "../App";

type viewtask = {
    tasks: Task[],
    settasks: React.Dispatch<React.SetStateAction<Task[]>>
};

export default function Viewtasks({tasks, settasks}: viewtask){

    const context = useContext(variablecontext);
    if (!context) { throw new Error("Context not found") }

    const {date, setdate, title, settitle, description, setdescription, status, setstatus, setmsg, setisadded} = context;
    const [checkid, setcheckid] = useState<number | null>(null);
    const [isdeleting, setisdeleting] = useState<boolean>(false);
    const [isediting, setisediting] = useState<boolean>(false);

    const setvalues = (task: Task) => {
            settasks(prevtasks => prevtasks.map( t => {
                if(t.id === task.id){
                    const newtasks: Task = {
                        ...t,
                        title: title,
                        description: description,
                        dueDate: date,
                        status: status
                    };
                    return newtasks;
                }
                    return t;   
            })
        
        );
            setisediting(false);
            setcheckid(null);
            setdate("");
            settitle("");
            setdescription("");
            setstatus("Pending");
}
    const updatevalues = (task: Task) => {
        const results = tasks.find(t => t.id === task.id);
        if(!results) return;
        settitle(results.title);
        setdescription(results.description);
        setdate(results.dueDate);
        setstatus(results.status);
    }

    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks])

    const getStatusClass = (status: string): string => {
        switch (status) {
            case "Pending": return "text-yellow-500 font-semibold";
            case "Completed": return "text-green-500 font-semibold";
            case "In Progress": return "text-blue-500 font-semibold";
            default: return "";
    }};

    return(
        <>
        <div className="body-2 mt-10 w-full">
            <h2 className="text-[25px] font-semibold">Tasks</h2>
            <div className="tables w-full border-[1px] border-[#c1c1c1] mt-5 text-left rounded-md overflow-x-scroll">
                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="[&>*]:p-3 [&>*]:border-[#c1c1c1] [&>th:not(:last-child)]:border-r-[1px] border-b-[1px] border-[#c1c1c1] bg-[#f1f1f1]">
                            <th>ID</th>
                            <th>Title</th>
                            <th className="">Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr:not(:last-child)]:border-b-[1px]">
                        {
                            tasks.map((task)=>{
                                return(
                                    <tr key={task.id} className="[&>*]:p-3 [&>td]:border-[#c1c1c1]  [&>td:not(:last-child)]:border-r-[1px] border-[#c1c1c1]">
                                        <td>
                                            {task.id}
                                        </td>
                                        <td>
                                            {isediting && checkid === task.id ? <input type="text" value={title} onChange={(e)=> settitle(e.target.value)}/> : task.title}
                                        </td>
                                        <td>{isediting && checkid === task.id ? <input type="text" value={description} onChange={(e)=> setdescription(e.target.value)} />: task.description}</td>
                                        <td>{isediting && checkid === task.id ? <input type="date" value={date} onChange={(e)=> setdate(e.target.value)} /> : task.dueDate}</td>
                                        <td className={getStatusClass(status)}>{isediting && checkid === task.id ? 
                                            <select id="status" name="status" required value={task.status} onChange={(e)=>{setstatus(e.target.value as typeof status)}} className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md mb-3">
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="In Progress">In Progress</option>
                                            </select> : task.status}
                                        </td>
                                        <td className="text-center 
                                                    [&_button]:border [&_button]:border-[#c1c1c1] [&_button]:cursor-pointer [&_button]:hover:bg-gray-100 [&_button]:rounded-md [&_button]:text-[18px] 
                                                    [&_button]:bg-gray-200 [&_button]:p-1">


                                            <div className="relative inline-block mr-5">
                                                <button onClick={() => {
                                                    setisdeleting(true);
                                                    setcheckid(task.id)}}>🗑️</button>
                                                {isdeleting && checkid === task.id && <div className={"ask absolute -top-[140%] -translate-x-1/2 left-1/2 mb-2 scale-[0.6] p-3 bg-white border border-[#c1c1c1] rounded-md flex flex-nowrap gap-5 whitespace-nowrap [&>button]:cursor-pointer [&>button]:rounded-md [&>button]:bg-gray-200 [&>button]:text-[18px] [&>button]:p-1"}>
                                                    Delete entry? 
                                                    <button onClick={()=>{settasks(()=>{
                                                        const newtasks = tasks.filter(t => t.id !== task.id);
                                                        localStorage.setItem("tasks", JSON.stringify(newtasks));
                                                        setcheckid(null);
                                                        setisdeleting(false);
                                                        setmsg("Deletion successful");
                                                        setisadded(true);
                                                        setInterval(() => {
                                                            setisadded(false);
                                                            setmsg("");
                                                        }, 3000);
                                                        return newtasks;
                                                    })}}>✔️</button> 
                                                    <button onClick={()=> setcheckid(null)}>❌</button>
                                                </div>}
                                            </div> 
                                            {isediting ? <button onClick={()=> {
                                                setmsg("Updation successful");
                                                setisadded(true);
                                                setInterval(() => {
                                                    setisadded(false);
                                                    setmsg("");
                                                }, 3000);
                                                setvalues(task);
                                                }}>✅</button> : <button onClick={()=>{
                                                    setcheckid(task.id);
                                                    updatevalues(task);
                                                    setisediting(true)

                                                    }}>✏️</button>}                                      
                                        </td>

                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
            
        </div>
        </>
    );}