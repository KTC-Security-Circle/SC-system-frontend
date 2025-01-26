import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersection = () => {
    const [ isIntersecting, setIsIntersecting ]=useState<boolean>(false);
    const [ trigger ,setTrigger ] = useState<number>(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const callback = useCallback((element: HTMLDivElement)=>{
        if(element){
            ref.current = element;
            setIsIntersecting(false);
            setTrigger((prev)=>prev+1);
        }
    },[]);

    useEffect(()=>{
        if(trigger && ref.current){
            const observer = new IntersectionObserver(([entry],observer)=>{
                if(entry.isIntersecting){
                    setIsIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },{ threshold: 0.8});
            observer.observe(ref.current);
            return ()=> observer.disconnect();
        }
    },[trigger]);
    return [ callback, isIntersecting ] as const;
}