import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


function ForgotPassword() {
 const [fullName, setFullName] = useState('');
 const [email, setEmail] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();


 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError('');
   setMessage('');


   // Input validation
   if (!fullName || !email) {
     setError('Full name and email are required.');
     setLoading(false);
     return;
   }


   // Email format validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     setError('Please enter a valid email address.');
     setLoading(false);
     return;
   }


   try {
     const response = await fetch('https://sendit-backend-j83j.onrender.com/forgot-password', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ fullName, email }),
     });


     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to send reset link');
     }


     const data = await response.json();
     setMessage(data.message || 'Password reset link sent to your email.');
   } catch (error) {
     setError(error.message || 'Something went wrong. Please try again.');
   } finally {
     setLoading(false);
   }
 };


 return (
   <div className="auth-page">
     <div className="right-side">
       <button
         className="back-button"
         onClick={() => navigate('/login')}
         aria-label="Go back"
       >
         <FaArrowLeft />
       </button>
       <div className="auth-form">
         <div className="user-icon-container">
           <div className="user-icon-circle">
             <span className="user-icon">🔒</span>
           </div>
         </div>
         <h1>Forgot Password</h1>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label>Full Name</label>
             <input
               type="text"
               placeholder="Enter your full name"
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
               required
               disabled={loading}
             />
           </div>
           <div className="form-group">
             <label>Email</label>
             <input
               type="email"
               placeholder="Enter your email address"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               disabled={loading}
             />
           </div>
           {message && <p className="success-message">{message}</p>}
           {error && <p className="error-message">{error}</p>}
           <button type="submit" className="auth-button" disabled={loading}>
             {loading ? 'Sending...' : 'Send Reset Link'}
           </button>
         </form>
         <p className="auth-link">
           Remember your password? <Link to="/login">Login</Link>
         </p>
       </div>
     </div>
   </div>
 );
}


export default ForgotPassword;
