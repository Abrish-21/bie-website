import axios from 'axios';

const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Always use relative paths in browser to avoid port conflicts
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // Fallback for server-side usage during development
  return 'http://localhost:3000/api';
};

// Create axios instance with default config
const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Simple retry for timeouts/network errors (up to 2 retries)
    const config: any = error.config || {};
    const shouldRetry = error.code === 'ECONNABORTED' || error.message?.includes('timeout') || !error.response;
    if (shouldRetry) {
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount < 2) {
        config.__retryCount += 1;
        const backoffMs = 300 * Math.pow(2, config.__retryCount - 1);
        return new Promise((resolve) => setTimeout(resolve, backoffMs)).then(() => api(config));
      }
    }
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: { name: string; username: string; email: string; password: string; role?: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

// Posts API functions
export const postsAPI = {
  getAll: async (filters?: { tag?: string; type?: string; category?: string; limit?: number; skip?: number }) => {
    const params = new URLSearchParams();
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.skip) params.append('skip', filters.skip.toString());
    
    const response = await api.get(`/posts?${params.toString()}`);
    return response.data;
  },
  
  getBySlug: async (slug: string) => {
    const response = await api.get(`/posts/slug/${slug}`);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  
  create: async (postData: any) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },
  
  update: async (id: string, postData: any) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
  
  getTags: async () => {
    const response = await api.get('/posts/tags');
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/posts/categories');
    return response.data;
  },
  
  // User management functions (for superadmin)
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// Users API functions (admin only)
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  create: async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  update: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

export default api;