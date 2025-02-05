'use client';
import React, { createContext, useContext, useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { fetchSessionItems } from "@/hook/getSession";

interface SessionItem {
  id: number;
  session_name: string;
}

const GetSession = createContext<SessionItem[]>([]);
const SetGetSession = createContext<Dispatch<SetStateAction<SessionItem[]>>>(()=>{});

export const GetSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [getSessions, setGetSessions] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const isFetched = useRef(false); 

    useEffect(() => {
        if (!isFetched.current) {  
            isFetched.current = true;
            const fetchSessions = async () => {
                setLoading(true);
                try {
                    const data = await fetchSessionItems();
                    if (Array.isArray(data)) {
                        setGetSessions(data);
                    } else if (data && Array.isArray(data.items)) {
                        setGetSessions(data.items);
                    } else {
                        setGetSessions([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch sessions:", error);
                    setGetSessions([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchSessions();
        }
    }, []);

    return (
        <GetSession.Provider value={getSessions}>
            <SetGetSession.Provider value={setGetSessions}>
                {children}
            </SetGetSession.Provider>
        </GetSession.Provider>
    );
};

export const useGetSession = () => {
    const getSession = useContext(GetSession);
    const setGetSession = useContext(SetGetSession);
    if (setGetSession === null) {
        throw new Error("useGetSession must be used within a GetSessionProvider");
    }
    return { getSession, setGetSession };
};
