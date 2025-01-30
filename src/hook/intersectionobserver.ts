import { useCallback, useEffect, useRef, useState } from "react";

export const useIntersection = () => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const callback = useCallback((element: HTMLDivElement) => {
        if (element) {
            ref.current = element;
            setIsIntersecting(false);
        }
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            }
        }, { threshold: 0.8 });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return [callback, isIntersecting] as const;
};
