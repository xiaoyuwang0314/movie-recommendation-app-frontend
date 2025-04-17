import { useState } from "react";
import axios from "axios";

export default function MoviePage() {
    const [id, setId] = useState("");
    const [result, setResult] = useState(null);

    const fetchMovie = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://api.justanotherapp.me/v1/movie", {
                params: { id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResult(res.data);
        } catch (err) {
            alert("Failed to fetch movie.");
            console.error("Login failed:", err);
        }
    };

    return (
        <div>
            <h2>Search Movie</h2>
            <input
                type="text"
                placeholder="Enter movie ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={fetchMovie}>Search</button>
            {result && (
                <div style={{ marginTop: "1rem" }}>
                    <h3>Result</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
