import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';


function SignUp() {
 const { role } = useParams();
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   password: '',
   confirmPassword: '',
   role: role || 'user', // Default to 'user' if role is not provided
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const navigate = useNavigate();
 const { login } = useAuth();


 const handleSubmit = async (e) => {
   e.preventDefault();


   // Validate passwords match
   if (formData.password !== formData.confirmPassword) {
     setError('Passwords do not match');
     return;
   }


   setLoading(true);
   setError('');


   try {
     const response = await fetch('https://sendit-backend-j83j.onrender.com/signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });


     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to create account');
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
     console.error('Signup error:', error);
     setError(error.message || 'An error occurred. Please try again.');
   } finally {
     setLoading(false);
   }
 };


 return (
   <div className="auth-page">
     <div className="right-side">
       <button
         className="back-button"
         onClick={() => navigate('/')}
         aria-label="Go back"
       >
         <FaArrowLeft />
       </button>
       <div className="auth-form">
         <div className="user-icon-container">
           <div className="user-icon-circle">
             <span className="user-icon">👤</span>
           </div>
         </div>
         <h1>Create Account</h1>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label>Full Name</label>
             <input
               type="text"
               placeholder="Your full name"
               value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               required
               disabled={loading}
             />
           </div>
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
               placeholder="Password"
               value={formData.password}
               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
               required
               autoComplete="new-password"
               disabled={loading}
             />
           </div>
           <div className="form-group">
             <label>Confirm Password</label>
             <input
               type="password"
               placeholder="Confirm password"
               value={formData.confirmPassword}
               onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
               required
               autoComplete="new-password"
               disabled={loading}
             />
           </div>


           {error && <p className="error-message">{error}</p>}


           <button type="submit" className="auth-button" disabled={loading}>
             {loading ? 'Registering...' : 'Register'}
           </button>
         </form>
         <p className="auth-link">
           Already have an account? <Link to="/login">Login</Link>
         </p>
       </div>
     </div>
   </div>
 );
}


export default SignUp;
