// Authentication Module
// This module handles user authentication and authorization

import { useState, useEffect, createContext, useContext } from 'react';

// Create authentication context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check for stored auth token
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Validate token with backend (in production)
          // For development, simulate a logged in user
          const userData = JSON.parse(localStorage.getItem('user_data') || 'null');
          
          if (userData) {
            setUser(userData);
          } else {
            // If no user data but token exists, clear token
            localStorage.removeItem('auth_token');
          }
        }
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setError('Authentication error. Please log in again.');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In production, this would call a backend API
      // For development, simulate successful login
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const userData = {
        id: `user_${Math.random().toString(36).substring(2, 15)}`,
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'client',
        createdAt: new Date().toISOString()
      };
      
      // Store auth token and user data
      const token = `token_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials and try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password, role = 'client') => {
    try {
      setLoading(true);
      setError(null);
      
      // In production, this would call a backend API
      // For development, simulate successful registration
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: `user_${Math.random().toString(36).substring(2, 15)}`,
        email,
        name,
        role,
        createdAt: new Date().toISOString()
      };
      
      // Store auth token and user data
      const token = `token_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In production, this would call a backend API
      // For development, simulate successful update
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stored user data
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  // Auth context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected route component
export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    
    // If authentication is still loading, show loading state
    if (loading) {
      return <div>Loading authentication...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    
    // If authenticated, render the component
    return <Component {...props} />;
  };
}

// Role-based protected route component
export function withRole(Component, allowedRoles) {
  return function RoleProtectedRoute(props) {
    const { user, loading, hasRole } = useAuth();
    
    // If authentication is still loading, show loading state
    if (loading) {
      return <div>Loading authentication...</div>;
    }
    
    // If not authenticated, redirect to login
    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    
    // If authenticated but doesn't have required role, show unauthorized
    const hasAllowedRole = Array.isArray(allowedRoles)
      ? allowedRoles.some(role => hasRole(role))
      : hasRole(allowedRoles);
    
    if (!hasAllowedRole) {
      return <div>Unauthorized: You don't have permission to access this page.</div>;
    }
    
    // If authenticated and has required role, render the component
    return <Component {...props} />;
  };
}
