'use client';   
import React,{createContext,SetStateAction,useContext,useState,Dispatch} from "react";

const SessionContext = createContext<number|null>(null);

const SetSessionContext = createContext<Dispatch<SetStateAction<number|null>>>(()=>{});

export const SessionProvider:React.FC<{children: React.ReactNode}> = ({ children })  =>{
    const [deleteSession,setDeleteSession] = useState<number |null>(null);
    return (
        <SessionContext.Provider value={deleteSession}>
            <SetSessionContext.Provider value={setDeleteSession}>
                {children}
            </SetSessionContext.Provider>
        </SessionContext.Provider>
    );
};
export const useSession = () => {
    const deletedSessionId = useContext(SessionContext);
    const setDeletedSessionId = useContext(SetSessionContext);

    if (setDeletedSessionId === null) {
        throw new Error("useSession must be used within a SessionProvider");
    }

    return { deletedSessionId, setDeletedSessionId };
};