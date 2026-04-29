import axios from 'axios';
import { clearAuthSession, getAccessToken, getRefreshToken, isAuthenticated } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://creatx-backend.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.url?.includes('/users/refresh-token');

    if (!error.response) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest &&
      isAuthenticated() &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = refreshResponse.data.data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthSession();
        return Promise.reject(refreshError);
      }
    }

    if (error.response.status === 401 && isRefreshRequest) {
      clearAuthSession();
    }

    return Promise.reject(error);
  }
);

export default api;
