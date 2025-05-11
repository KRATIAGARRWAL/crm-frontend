import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add response interceptor for handling errors
api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response || {};
    
    // Handle token expiration
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;