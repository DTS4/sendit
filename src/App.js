import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';
import SignUp from './component/SignUp';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import UserDashboard from './component/UserDashboard';
import DashboardPage from './component/DashboardPage';
import './App.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Wrap the entire app with ToastContainer for notifications */}
        <ToastContainer position="top-right" autoClose={3000} closeOnClick />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup/:role" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes for User */}
          <Route
            path="/dashboard/user"
            element={<ProtectedRoute role="user" />}
          >
            <Route index element={<UserDashboard />} />
          </Route>

          {/* Protected Routes for Admin */}
          <Route
            path="/dashboard/admin/*" // Add trailing * to match nested routes
            element={<ProtectedRoute role="admin" />}
          >
            <Route index element={<DashboardPage />} />
          </Route>

          {/* Fallback Route (Optional) */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;