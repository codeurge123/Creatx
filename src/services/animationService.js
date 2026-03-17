import api from '../utils/api';

export const animationAPI = {
  // User animations
  create: (animationData) => api.post('/animations', animationData),
  getUserAnimations: () => api.get('/animations/user'),
  getById: (id) => api.get(`/animations/${id}`),
  update: (id, animationData) => api.patch(`/animations/${id}`, animationData),
  delete: (id) => api.delete(`/animations/${id}`),
  togglePublic: (id) => api.patch(`/animations/${id}/toggle-public`),
  toggleLike: (id) => api.post(`/animations/${id}/like`),

  // Public animations (for community)
  getPublic: (params = {}) => api.get('/animations/public', { params }),
};