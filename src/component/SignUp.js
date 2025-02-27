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



export default SignUp;
