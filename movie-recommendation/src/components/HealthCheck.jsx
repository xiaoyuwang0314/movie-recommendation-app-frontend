import { useState } from "react";
import axios from "axios";

export default function HealthCheck() {
    const [status, setStatus] = useState(null);

    const checkHealth = async () => {
        try {
            const res = await axios.get("http://api.justanotherapp.me/v1/healthcheck");
            setStatus(res.data);
        } catch (err) {
            setStatus({ error: "API is unreachable or unhealthy." });
        }
    };

    return (
        <div>
            <h2>API Health Check</h2>
            <button onClick={checkHealth}>Check API Status</button>
            {status && (
                <div style={{ marginTop: "1rem" }}>
                    <pre>{JSON.stringify(status, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
