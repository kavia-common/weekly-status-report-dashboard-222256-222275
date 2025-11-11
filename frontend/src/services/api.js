import axios from 'axios';

/**
 * API Client Configuration
 * Axios instance configured to communicate with the backend API
 * Reads base URL from environment variables with fallback
 */

// Determine base URL from environment variables
// Priority: REACT_APP_API_BASE > REACT_APP_BACKEND_URL > fallback to localhost
const baseURL = 
  process.env.REACT_APP_API_BASE || 
  process.env.REACT_APP_BACKEND_URL || 
  'http://localhost:8000/api';

// PUBLIC_INTERFACE
/**
 * Axios client instance for making API requests
 * Configured with base URL, timeout, and common headers
 */
const apiClient = axios.create({
  baseURL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// PUBLIC_INTERFACE
/**
 * Request interceptor
 * Adds authentication token and other headers to outgoing requests
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
/**
 * Response interceptor
 * Handles responses and errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.method.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      console.error(`[API Error] ${status}:`, data);

      // Handle specific error codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          // TODO: Implement redirect to login page when auth is implemented
          console.warn('Unauthorized access - token cleared');
          break;

        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;

        case 404:
          // Not found
          console.error('Resource not found');
          break;

        case 500:
          // Server error
          console.error('Server error occurred');
          break;

        default:
          console.error(`API Error: ${status}`);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('[API Error] No response received:', error.request);
      console.error('Possible causes: Network error, CORS issue, or backend is down');
    } else {
      // Error in setting up the request
      console.error('[API Error] Request setup failed:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
