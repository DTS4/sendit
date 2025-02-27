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


 
 );
}


export default Login;
