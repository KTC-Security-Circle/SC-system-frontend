'use client';   
import React,{createContext,SetStateAction,useContext,useState,Dispatch} from "react";

const sessionContext = createContext<number|null>(null);

const setSessionContext = createContext<Dispatch<SetStateAction<number|null>>>(()=>{});

export const SessionProvider:React.FC<{children: React.ReactNode}> = ({ children })  =>{
    const [deleteSession,setDeleteSession] = useState<number |null>(null);
    return (
        <sessionContext.Provider value={deleteSession}>
            <setSessionContext.Provider value={setDeleteSession}>
                {children}
            </setSessionContext.Provider>
        </sessionContext.Provider>
    );
};
export const useSession = () => {
    const deletedSessionId = useContext(sessionContext);
    const setDeletedSessionId = useContext(setSessionContext);

    if (setDeletedSessionId === null) {
        throw new Error("useSession must be used within a SessionProvider");
    }

    return { deletedSessionId, setDeletedSessionId };
};