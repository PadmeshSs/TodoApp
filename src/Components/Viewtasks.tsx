
import type { Task } from "../App";

type viewtask = {
    tasks: Task[],
    settasks: React.Dispatch<React.SetStateAction<Task[]>>
};

export default function Viewtasks({tasks, settasks}: viewtask){
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Pending": return "text-yellow-500 font-semibold";
            case "Completed": return "text-green-500 font-semibold";
            case "In Progress": return "text-blue-500 font-semibold";
            default: return "";
    }};

    const deleteentry = (id:number) =>{

    }

    return(
        <>
        <div className="body-2 mt-10">
            <h2 className="text-[25px] font-semibold">Tasks</h2>
            <div className="table  border-[1px] border-[#c1c1c1] mt-5 text-left rounded-md">
                <table className="w-full table-fixed">
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
                                        <td>{task.id}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.dueDate}</td>
                                        <td className={getStatusClass(task.status)}>{task.status}</td>
                                        <td className="text-center 
                                                    [&_button]:border [&_button]:border-[#c1c1c1] [&_button]:cursor-pointer [&_button]:hover:bg-gray-100 [&_button]:rounded-md [&_button]:text-[18px] 
                                                    [&_button]:bg-gray-200 [&_button]:p-1">


                                        <div className="relative inline-block mr-5">
                                            <button onClick={() => deleteentry(task.id)}>🗑️</button>
                                            <div className="ask absolute -top-[140%] hidden -translate-x-1/2 left-1/2 mb-2 scale-[0.6] p-3 bg-white border border-[#c1c1c1] rounded-md flex flex-nowrap gap-5 whitespace-nowrap [&>button]:cursor-pointer [&>button]:rounded-md [&>button]:bg-gray-200 [&>button]:text-[18px] [&>button]:p-1">
                                                Delete entry? 
                                                <button>✔️</button> 
                                                <button>❌</button>
                                            </div>
                                        </div>

                                        {/* Other action buttons */}
                                        <button>✏️</button>
                                        <button className="hidden">✅</button>
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
    );
}