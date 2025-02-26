import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContext from './context/UserContext';
import UserDashboard from './pages/UserDashboard';
import { UserProvider } from './context/UserContext';
import './App.css';



function App() {
  return (
    <Router>
      <UserProvider>
        <UserDashboard />
      </UserProvider>
    </Router>
  );
}


export default App;