import React, { useState } from 'react';import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


function ResetPassword() {
 const { token } = useParams();
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();


 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError('');
   setMessage('');


   // Validate passwords match
   if (password !== confirmPassword) {
     setError('Passwords do not match');
     setLoading(false);
     return;
   }


   try {
     const response = await fetch('https://sendit-backend-j83j.onrender.com/reset-password', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ token, password }),
     });


     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to reset password');
     }


     const data = await response.json();
     setMessage(data.message || 'Password reset successfully!');
     setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
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
       