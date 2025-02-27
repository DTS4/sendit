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
