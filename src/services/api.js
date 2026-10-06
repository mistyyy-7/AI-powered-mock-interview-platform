// Central API client service for React Frontend -> Express Backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to construct request headers with JWT token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Generic fetch wrapper with error handling
const request = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.warn(`[API Client Warning] Endpoint ${endpoint} failed:`, error.message);
    throw error;
  }
};

export const api = {
  // Auth API Endpoints
  register: async (userData) => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  login: async (credentials) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  getMe: async () => {
    return await request('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Interview API Endpoints
  createInterview: async (interviewData) => {
    try {
      return await request('/interviews', {
        method: 'POST',
        body: JSON.stringify(interviewData)
      });
    } catch (err) {
      console.log('[API] Saving to local fallback due to API error');
      return null;
    }
  },

  getInterviews: async () => {
    try {
      return await request('/interviews');
    } catch (err) {
      console.log('[API] Falling back to local interview store');
      return null;
    }
  },

  getInterviewById: async (id) => {
    try {
      return await request(`/interviews/${id}`);
    } catch (err) {
      console.log('[API] Falling back to local interview detail');
      return null;
    }
  },

  updateInterview: async (id, updateData) => {
    try {
      return await request(`/interviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
    } catch (err) {
      console.log('[API] Falling back to local update');
      return null;
    }
  },

  evaluateInterview: async (questions, answers) => {
    try {
      return await request('/interviews/evaluate', {
        method: 'POST',
        body: JSON.stringify({ questions, answers })
      });
    } catch (err) {
      console.error('[API] Evaluation failed:', err);
      return null;
    }
  }
};

export default api;
