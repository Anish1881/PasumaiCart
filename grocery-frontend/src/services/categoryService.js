import api from "./api";

const BASE = "/api/categories";

export const getCategories = () => api.get(BASE);

export const getCategoryById = (id) => api.get(`${BASE}/${id}`);

export const createCategory = (category) => api.post(BASE, category);

export const updateCategory = (id, category) => api.put(`${BASE}/${id}`, category);

export const deleteCategory = (id) => api.delete(`${BASE}/${id}`);