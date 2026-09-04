import api from "./api";

const BASE = "/api/orders";

export const createOrder = (userId, orderData) =>
    api.post(`${BASE}/user/${userId}`, orderData);

export const getUserOrders = (userId) =>
    api.get(`${BASE}/user/${userId}`);

export const getAllOrders = () => api.get(BASE);

export const updateOrderStatus = (id, status) =>
    api.put(`${BASE}/${id}/status?status=${status}`);