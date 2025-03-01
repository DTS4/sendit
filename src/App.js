
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './component/HomePage';
import SignUp from './component/SignUp';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';

import './App.css';



function App() {
 return (
   <AuthProvider>
     <Router>
       <Routes>
         {/* Public Routes */}
         <Route path="/" element={<HomePage />} />
         <Route path="/signup/:role" element={<SignUp />} />
         <Route path="/login" element={<Login />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />


         {/* Protected Routes */}
         <Route
           path="/dashboard/user"
           element={<ProtectedRoute role="user" />}
         >
           <Route index element={<u/>} />
         </Route>


         <Route
           path="/dashboard/admin"
           element={<ProtectedRoute role="admin" />}
         >
           <Route index element={<a/>} />
         </Route>


         {/* Fallback Route (Optional) */}
         <Route path="*" element={<h1>404 - Page Not Found</h1>} />
       </Routes>
     </Router>
   </AuthProvider>
 );
}


export default App;
