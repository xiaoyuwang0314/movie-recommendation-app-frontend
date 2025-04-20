import axios from "axios";
import { API_ENDPOINTS } from "../config";

// axios
const api = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// error
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("API Error:", error);
        if (error && error.response) {
            console.log("Error status:", error.response.status);
            console.log("Error data:", error.response.data);

            if (error.response.status === 401) {
                console.log("Handling 401 error");
                const currentPath = window.location.pathname;
                console.log("Current path:", currentPath);

                // redirect
                if (currentPath !== "/login" && currentPath !== "/register") {
                    console.log("Redirecting to login");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                } else {
                    console.log("Already on login/register page, not redirecting");
                }
            }
        }
        return Promise.reject(error);
    }
);

// api for users
export const authService = {
    login: async(email, password) => {
        const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
        return response.data;
    },
    register: async(email, password) => {
        const response = await api.post(API_ENDPOINTS.REGISTER, { email, password });
        return response.data;
    },
};

// movie API
export const movieService = {
    search: async(id) => {
        const response = await api.get(API_ENDPOINTS.MOVIE, { params: { id } });
        return response.data;
    },
    getRating: async(movieId) => {
        const response = await api.get(`${API_ENDPOINTS.RATING}/${movieId}`);
        return response.data;
    },
};

// healthcheck (delete it plz)
export const systemService = {
    healthCheck: async() => {
        const response = await api.get(API_ENDPOINTS.HEALTHCHECK);
        return response.data;
    },
};

export default api;