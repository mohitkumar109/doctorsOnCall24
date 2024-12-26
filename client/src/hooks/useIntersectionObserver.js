import React, { useEffect, useRef, useState } from "react";

// Custom Hook for IntersectionObserver
const useIntersectionObserver = (callback, options) => {
    const observer = useRef(null);
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (callback) callback(entry);
            });
        }, options);

        const { current: currentObserver } = observer;
        if (element) currentObserver.observe(element);

        return () => currentObserver.disconnect();
    }, [element, callback, options]);

    return setElement;
};

export default useIntersectionObserver;
