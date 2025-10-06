import type { Task } from "../App";

type viewtask = {
    tasks: Task[] | null,
    settasks: React.Dispatch<React.SetStateAction<Task[] | null>>
};

export default function Viewtasks({tasks, settasks}: viewtask){



    return(
        <>
        <div className="body-2 mt-10">
            <h2 className="text-[25px] font-semibold">Tasks</h2>
            <div className="table w-full border-[1px] border-[#c1c1c1] mt-5 text-left rounded-md">
                <table className="w-full">
                    <thead>
                        <tr className="[&>*]:p-3 [&>*]:border-[#c1c1c1] [&>th:not(:last-child)]:border-r-[1px] border-b-[1px] border-[#c1c1c1] bg-[#f1f1f1]">
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr:not(:last-child)]:border-b-[1px]">
                        <tr className="[&>*]:p-3 [&>td]:border-[#c1c1c1]  [&>td:not(:last-child)]:border-r-[1px] border-[#c1c1c1]">
                            <td>Workout</td>
                            <td>Leg day</td>
                            <td>2025-10-15</td>
                            <td>Pending</td>
                        </tr>
                        <tr className="[&>*]:p-3 [&>td]:border-[#c1c1c1]  [&>td:not(:last-child)]:border-r-[1px] border-[#c1c1c1]">
                            <td>Workout</td>
                            <td>Leg day</td>
                            <td>2025-10-15</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
        </>
    );
}