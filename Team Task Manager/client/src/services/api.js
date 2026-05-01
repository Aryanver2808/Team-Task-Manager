import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  getCurrentUser: () => API.get('/auth/me')
};

// Projects API
export const projectsAPI = {
  getAll: () => API.get('/projects'),
  getOne: (id) => API.get(`/projects/${id}`),
  create: (data) => API.post('/projects', data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`)
};

// Tasks API
export const tasksAPI = {
  create: (data) => API.post('/tasks', data),
  getByProject: (projectId) => API.get(`/tasks/project/${projectId}`),
  getAssigned: () => API.get('/tasks/assigned/my-tasks'),
  getDashboard: () => API.get('/tasks/dashboard/stats'),
  update: (id, data) => API.put(`/tasks/${id}`, data),
  delete: (id) => API.delete(`/tasks/${id}`)
};

// Teams API
export const teamsAPI = {
  getAll: () => API.get('/teams'),
  getOne: (id) => API.get(`/teams/${id}`),
  create: (data) => API.post('/teams', data),
  addMember: (teamId, data) => API.post(`/teams/${teamId}/members`, data),
  removeMember: (teamId, userId) => API.delete(`/teams/${teamId}/members/${userId}`),
  update: (teamId, data) => API.put(`/teams/${teamId}`, data),
  delete: (teamId) => API.delete(`/teams/${teamId}`)
};

// Users API
export const usersAPI = {
  getAll: () => API.get('/users'),
  getProfile: (id) => API.get(`/users/profile/${id}`),
  updateProfile: (data) => API.put('/users/profile/update', data)
};

export default API;
