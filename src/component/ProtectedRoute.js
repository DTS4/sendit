import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ role, redirectPath = '/', loginPath = '/login', children }) {
  const { user } = useAuth();

  // If the user is not logged in, redirect to the home page ("/") instead of the login page
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If the user's role does not match the required role, redirect to the specified path
  if (role && user.role !== role) {
    return <Navigate to={redirectPath} replace />;
  }

  // If the user is authenticated and has the required role, render the nested routes or children
  return children ? children : <Outlet />;
}

export default ProtectedRoute;