'use client';   
import React,{createContext,SetStateAction,useContext,useState,Dispatch} from "react";

const curSession = createContext<number|null>(null);
const setCurSession = createContext<Dispatch<SetStateAction<number|null>>>(()=>{});

export const CurrentSessionProvider:React.FC<{children: React.ReactNode}> = ({ children })  =>{
    const [currentSession,setCurrentSession] = useState<number |null>(null);
    return (
        <curSession.Provider value={currentSession}>
            <setCurSession.Provider value={setCurrentSession}>
                {children}
            </setCurSession.Provider>
        </curSession.Provider>
    );
};

export const useCurrentSession = () => {
    const currentSessionId = useContext(curSession);
    const setCurrentSessionId = useContext(setCurSession);

    if (setCurrentSessionId === null) {
        throw new Error("useCurrentSession must be used within a CurrentSessionProvider");
    }

    return { currentSessionId, setCurrentSessionId };
}