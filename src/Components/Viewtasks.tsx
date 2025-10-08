
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
        }
        };

    return(
        <>
        <div className="body-2 mt-10">
            <h2 className="text-[25px] font-semibold">Tasks</h2>
            <div className="table w-[600px] border-[1px] border-[#c1c1c1] mt-5 text-left rounded-md">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="[&>*]:p-3 [&>*]:border-[#c1c1c1] [&>th:not(:last-child)]:border-r-[1px] border-b-[1px] border-[#c1c1c1] bg-[#f1f1f1]">
                            <th>ID</th>
                            <th>Title</th>
                            <th className="">Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
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