import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserContext from './context/UserContext';
import DashboardPage from './pages/DashboardPage';
import { UserProvider } from './context/UserContext';
import './App.css';



function App() {
  return (
    <Router>
      <UserProvider>
        <UserContext />
        <DashboardPage />
      </UserProvider>
    </Router>
  );
}

export default App;