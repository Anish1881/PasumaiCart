import axios from "axios";

// Shared axios instance — auto-injects JWT token on every request
const api = axios.create({
    baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
