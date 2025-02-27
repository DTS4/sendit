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
 
}


export default SignUp;
