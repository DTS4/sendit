import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';


function Login() {
 const [formData, setFormData] = useState({
   email: '',
   password: '',
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [showRoleModal, setShowRoleModal] = useState(false);
 const navigate = useNavigate();
 const { login } = useAuth();


 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError('');


   try {
     const response = await fetch('https://sendit-backend-j83j.onrender.com/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });


     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Invalid credentials');
     }


     const data = await response.json();
     const { user } = data;
     login(user);


     // Redirect based on role
     if (user.role === 'admin') {
       navigate('/dashboard/admin');
     } else {
       navigate('/dashboard/user');
     }
   } catch (error) {
     console.error('Login error:', error);
     setError(error.message || 'Wrong credentials. Please try again.');
   } finally {
     setLoading(false);
   }
 };


 const handleRoleSelection = (role) => {
   setShowRoleModal(false);
   navigate(`/signup/${role}`);
 };


 return (
   <div className="auth-page">
     <div className="right-side">
       <button className="back-button" onClick={() => navigate('/')} aria-label="Go back">
         <FaArrowLeft />
       </button>
       <div className="auth-form">
         <div className="user-icon-container">
           <div className="user-icon-circle">
             <span className="user-icon">👤</span>
           </div>
         </div>
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label>Email</label>
             <input
               type="email"
               placeholder="Email address"
               value={formData.email}
               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
               required
               disabled={loading}
             />
           </div>
           <div className="form-group">
             <label>Password</label>
             <input
               type="password"
               placeholder="Enter password"
               value={formData.password}
               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
               required
               autoComplete="current-password"
               disabled={loading}
             />
           </div>


           {error && <p className="error-message">{error}</p>}


           <p className="forgot-password-link">
             <Link to="/forgot-password">Forgot Password?</Link>
           </p>


          
 );
}


export default Login;
