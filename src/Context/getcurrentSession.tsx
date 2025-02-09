'use client';   
import React,{createContext,SetStateAction,useContext,useState,Dispatch} from "react";

const CurSession = createContext<number|null>(null);
const SetCurSession = createContext<Dispatch<SetStateAction<number|null>>>(()=>{});

export const CurrentSessionProvider:React.FC<{children: React.ReactNode}> = ({ children })  =>{
    const [currentSession,setCurrentSession] = useState<number |null>(null);
    return (
        <CurSession.Provider value={currentSession}>
            <SetCurSession.Provider value={setCurrentSession}>
                {children}
            </SetCurSession.Provider>
        </CurSession.Provider>
    );
};

export const useCurrentSession = () => {
    const currentSessionId = useContext(CurSession);
    const setCurrentSessionId = useContext(SetCurSession);

    if (setCurrentSessionId === null) {
        throw new Error("useCurrentSession must be used within a CurrentSessionProvider");
    }

    return { currentSessionId, setCurrentSessionId };
}