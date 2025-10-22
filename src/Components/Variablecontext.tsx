import { createContext } from "react";
import { useState } from "react";


type taskstatus = "Pending" | "Completed" | "In Progress";


type valuetype = {
    date: string,
    setdate: React.Dispatch<React.SetStateAction<string>>,
    title: string,
    settitle: React.Dispatch<React.SetStateAction<string>>,
    description: string,
    setdescription: React.Dispatch<React.SetStateAction<string>>,   
    status: taskstatus,
    setstatus: React.Dispatch<React.SetStateAction<taskstatus>>,
    msg: string,
    setmsg: React.Dispatch<React.SetStateAction<string>>,
    isadded: boolean,
    setisadded: React.Dispatch<React.SetStateAction<boolean>>
}



export const variablecontext = createContext<valuetype | null >(null);

export const Variableprovider = ({children} : {children: React.ReactNode}) => {
    const [date, setdate] = useState<string>("");
    const [title, settitle] = useState<string>("");
    const [description, setdescription] = useState<string>("");
    const [status, setstatus] = useState<taskstatus>("Pending");
    const [msg, setmsg] = useState<string>("");
    const [isadded, setisadded] = useState<boolean>(false);

    const value: valuetype = {
        date, setdate,
        title, settitle,
        description, setdescription,
        status, setstatus,
        msg, setmsg,
        isadded, setisadded
    };
        return(
            <variablecontext.Provider value={value}>
                {children}
            </variablecontext.Provider>
    );
}

