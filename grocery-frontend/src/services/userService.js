import api from "./api";

const BASE = "/api/users";

export const registerUser = (userData) => api.post(`${BASE}/register`, userData);

export const loginUser = (loginData) => api.post(`${BASE}/login`, loginData);