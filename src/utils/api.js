// This file creates an axios instance (api) that is configured to send requests to the backend.
// The base URL is configured to either use the NEXT_PUBLIC_API_URL environment variable or default to http://localhost:5001.
// It also handles JWT tokens by setting the Authorization header before sending requests.
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
    withCredentials: true, // Ensure cookies are sent if the backend uses them
});

// Add token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default api;
