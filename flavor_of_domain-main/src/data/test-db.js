// This IS a custom hook, so we'll rename it to follow the "use" naming convention
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3000";

export function useTestDb() {
    const [connected, setConnected] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;
        
        const getTestDb = async () => {
            try {
                const dbResult = await fetch(`${apiUrl}/api/test-db`, {
                    method: 'GET',
                    mode: 'cors'
                });
                
                if (!dbResult.ok) {
                    throw new Error(`test-db error status: ${dbResult.status}`);
                }

                const dbJson = await dbResult.json();
                
                /*
                 Strict mode runs all components twice, this will 
                 prevent stale calls from producing side effects
                 */
                if (ignore) return;

                setConnected(dbJson.connection);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        getTestDb();

        return () => { ignore = true; };
    }, []);

    return { connected, error, loading };
}