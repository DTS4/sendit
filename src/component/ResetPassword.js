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


 