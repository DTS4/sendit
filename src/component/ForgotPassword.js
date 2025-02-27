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


   