import api from "./api";

const BASE = "/api/products";

export const getProducts = () => api.get(BASE);

export const getProductById = (id) => api.get(`${BASE}/${id}`);

export const createProduct = (product) => api.post(BASE, product);

export const updateProduct = (id, product) => api.put(`${BASE}/${id}`, product);

export const deleteProduct = (id) => api.delete(`${BASE}/${id}`);