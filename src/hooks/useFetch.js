import { useState } from "react";


export const useFetch = (callback, delay) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetching = async (...args) => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, delay))
            await callback(...args);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};