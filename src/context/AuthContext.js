import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  clearAuth: () => {}, // Rename logout to clearAuth
  isAuthenticated: false,
});

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.token) {
          setUser(parsedUser);
          setIsAuthenticated(true); // Set authentication status
        } else {
          console.warn('Invalid user data in localStorage. Clearing...');
          localStorage.removeItem('user'); // Clear invalid data
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, []);

  // Login function
  const login = (userData) => {
    try {
      console.log('Logging in user:', userData); // Debugging (remove in production)
      setUser(userData);
      setIsAuthenticated(true); // Set authentication status
      localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to log in. Please try again.');
    }
  };

  // ClearAuth function (renamed from logout)
  const clearAuth = () => {
    try {
      console.log('Clearing authentication...');
      setUser(null);
      setIsAuthenticated(false); // Clear authentication status
      localStorage.removeItem('user'); // Clear user data
    } catch (error) {
      console.error('ClearAuth error:', error);
      throw new Error('Failed to clear authentication. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, clearAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}