import { useEffect } from "react";
const useDebounceCallback = (callback: () => void, delay = 500) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, callback]);
};

export default useDebounceCallback;
