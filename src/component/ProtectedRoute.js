import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ role, redirectPath = '/', loginPath = '/login' }) {
  const { user } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to={loginPath} />;
  }

  // If the user's role does not match the required role, redirect to the specified path
  if (role && user.role !== role) {
    return <Navigate to={redirectPath} />;
  }

  // If the user is authenticated and has the required role, render the nested routes
  return <Outlet />;
}

export default ProtectedRoute;