// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function ProtectedRoute({ role }) {
 const { user } = useAuth();


 if (!user) {
   return <Navigate to="/login" />;
 }


 if (user.role !== role) {
   return <Navigate to="/" />;
 }


 return <Outlet />;
}


export default ProtectedRoute;
