const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    BASE_URL: API_BASE_URL,
    LOGIN: `${API_BASE_URL}/v1/login`,
    REGISTER: `${API_BASE_URL}/v1/register`,
    MOVIE: `${API_BASE_URL}/v1/movie`,
    HEALTHCHECK: `${API_BASE_URL}/v1/healthcheck`,
    RATING: `${API_BASE_URL}/v1/rating`
};

export default API_ENDPOINTS;