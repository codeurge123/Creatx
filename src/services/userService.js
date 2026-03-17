import api from '../utils/api';

export const userAPI = {
  // Authentication
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  logout: () => api.post('/users/logout'),
  refreshToken: () => api.post('/users/refresh-token'),

  // Password management
  forgotPassword: (email) => api.post('/users/forgot-password', { email }),
  resetPassword: (data) => api.post('/users/reset-password', data),
  changePassword: (passwords) => api.post('/users/change-password', passwords),

  // User profile
  getCurrentUser: () => api.get('/users/current-user'),
  getUserById: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userData) => api.patch('/users/update-account', userData),
  getSharedAnimations: (userId) => api.get(`/users/${userId}/shared`),
  getLikedAnimations: () => api.get(`/users/likes`),
};