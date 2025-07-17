import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// User API calls
export const createUser = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.post('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Trip API calls
export const getTrips = async () => {
  try {
    const response = await api.get('/api/trips');
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const getTripById = async (id) => {
  try {
    const response = await api.get(`/api/trips/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trip:', error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await api.post('/api/trips', tripData);
    return response.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const updateTrip = async (id, tripData) => {
  try {
    const response = await api.put(`/api/trips/${id}`, tripData);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/api/trips/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};

// Destination API calls
export const getDestinations = async (tripId) => {
  try {
    const response = await api.get(`/api/destinations/${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const createDestination = async (destinationData) => {
  try {
    const response = await api.post('/api/destinations', destinationData);
    return response.data;
  } catch (error) {
    console.error('Error creating destination:', error);
    throw error;
  }
};

export const updateDestination = async (id, destinationData) => {
  try {
    const response = await api.put(`/api/destinations/${id}`, destinationData);
    return response.data;
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await api.delete(`/api/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
};

export default api;