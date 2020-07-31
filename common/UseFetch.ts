import { useEffect, useState } from "react";

export function useFetch(url: RequestInfo, mapper: (value: Response) => any, opts?: RequestInit | undefined) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(url, opts)
            .then(mapper)
            .then((res: any) => {
                setResponse(res);
                setLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setLoading(false);
            });
    }, [url]);
    return {response, loading, hasError};
}
