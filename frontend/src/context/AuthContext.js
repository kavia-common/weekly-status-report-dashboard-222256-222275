import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the AuthContext
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
/**
 * Custom hook to access the AuthContext.
 * Must be used within an AuthProvider.
 * @returns {object} Authentication context with user, roles, isAdmin, login, and logout
 * @throws {Error} If used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// PUBLIC_INTERFACE
/**
 * AuthProvider component that provides authentication state and methods
 * to the entire application. Currently uses stubbed login/logout for development.
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  // Derived flag: user is admin if they have 'admin' role
  const isAdmin = roles.includes('admin');

  // PUBLIC_INTERFACE
  /**
   * Stubbed login function. In production, this would authenticate with the backend.
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} User object with roles
   */
  const login = useCallback(async (email, password) => {
    // Stubbed implementation - in production, this would call the backend API
    // For now, simulate a successful login with mock data
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock user data - replace with actual API call
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        avatar: null,
      };

      // Mock roles - in production, this would come from the backend
      // For demo purposes, make users with 'admin' in email admins
      const mockRoles = email.includes('admin') ? ['user', 'admin'] : ['user'];

      setUser(mockUser);
      setRoles(mockRoles);

      return { user: mockUser, roles: mockRoles };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Stubbed logout function. In production, this would clear session with the backend.
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    // Stubbed implementation - in production, this would call the backend API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      setUser(null);
      setRoles([]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  // Context value with user state and auth methods
  const value = {
    user,
    roles,
    isAdmin,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
