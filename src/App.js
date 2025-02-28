import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ Use AuthProvider instead
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> {/* ✅ Wrap with AuthProvider instead of UserProvider */}
        <DashboardPage />
      </AuthProvider>
    </Router>
  );
}

export default App;
