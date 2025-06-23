import { useEffect, useState } from "react";

export const useFetch = (url, options = {},dependencies) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url, options);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
    
        fetchData();
    }, dependencies);
    
    return { data,loading , error };

}