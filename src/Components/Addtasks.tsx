

export default function Addtasks(){

    const inputs: string[] =["Title", "Description", "Due date"];

    return(
        <>
        <div className="body-1 mt-10">
            {inputs.map((input: string) => (
                <div key={input} className="mb-5">
                    <label htmlFor={input} className="font-semibold text-[20px]">{input}</label><br />
                    <input type="text" id={input} className="border-[2px] border-[#c1c1c1] w-full h-[30px] rounded-md"/>
                </div>
            ))}
            <button className="bg-[#08f] text-white px-5 py-2 hover:cursor-pointer hover:bg-[#046ecc] rounded-xl">Add Task</button>
        </div>
        </>
    );
}