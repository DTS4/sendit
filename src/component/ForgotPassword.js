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

