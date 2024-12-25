import axios from 'axios';

// Настройка API
const api = axios.create({
  baseURL: '/api', // Прокси на бэкенд (см. настройку в vite.config.js)
});

// Добавляем токен в заголовок для всех запросов
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Получаем токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Добавляем токен в заголовки
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Авторизация
export const register = (username, password) => api.post('/auth/register', { username, password });
export const login = (username, password) => api.post('/auth/login', { username, password });
export const getCurrentUser = () => api.get('/auth/me');  // Токен добавляется автоматически

// CRUD для элементов
export const getItems = () => api.get('/items');
export const createItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);
