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


   
   </div>
 );
}


export default Login;
