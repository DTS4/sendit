import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false, // Add a flag for authentication status
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
        setUser(parsedUser);
        setIsAuthenticated(true); // Set authentication status
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

  // Logout function
  const logout = () => {
    try {
      console.log('Logging out user'); // Debugging (remove in production)
      setUser(null);
      setIsAuthenticated(false); // Clear authentication status
      localStorage.removeItem('user'); // Clear user data
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to log out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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