import React, { createContext, useContext, useState, useEffect } from 'react';


// Create the AuthContext
const AuthContext = createContext({
 user: null,
 login: () => {},
 logout: () => {},
});


// AuthProvider component
export function AuthProvider({ children }) {
 const [user, setUser] = useState(null);


 // Check localStorage for user data on initial load
 useEffect(() => {
   const storedUser = localStorage.getItem('user');
   if (storedUser) {
     try {
       const parsedUser = JSON.parse(storedUser);
       setUser(parsedUser);
     } catch (error) {
       console.error('Failed to parse user data from localStorage:', error);
       localStorage.removeItem('user'); // Clear invalid data
     }
   }
 }, []);


 