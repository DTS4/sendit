import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

function SignUp() {
  const { role } = useParams();
  const [formData, setFormData] = useState({
    username: '', // Changed from 'name' to 'username'
    email: '',
    password: '',
    confirm_password: '', // Changed from 'confirmPassword' to 'confirm_password'
    role: role || 'user', // Default to 'user' if role is not provided
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Optional: Fetch data when the component mounts
  useEffect(() => {
    // Example: Fetch available roles or other data
    const fetchData = async () => {
      try {
        const response = await fetch('https://sendit-backend-j83j.onrender.com/signup', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        // Use the fetched data as needed (e.g., pre-fill the form)
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    // Validate that all required fields are filled
    if (!formData.username || !formData.email || !formData.password || !formData.confirm_password) {
      setError('Username, email, password, and confirm password are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Log the request payload for debugging
      console.log('Request payload:', formData);

      const response = await fetch('https://sendit-backend-j83j.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirm_password,
          role: formData.role,
        }),
      });

      // Handle non-JSON responses (e.g., HTML error pages)
      const responseText = await response.text();
      let data;
      try {
        // Attempt to parse the response as JSON
        data = JSON.parse(responseText);
      } catch (jsonError) {
        // If the response is not JSON, handle it as an HTML error page
        console.error('Non-JSON response:', responseText);

        // Extract the error message from the HTML <p> tag
        const errorMessage = responseText.match(/<p>(.*?)<\/p>/)?.[1] || 'Server error: Invalid response format';
        throw new Error(errorMessage);
      }

      // Log the response data for debugging
      console.log('Response data:', data);

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }

      // Ensure the response contains the expected fields
      if (!data.user || !data.user.role) {
        throw new Error('Invalid response from server');
      }

      const { user } = data;
      login(user);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard/user');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="right-side">
        <button
          className="back-button"
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <div className="auth-form">
          <div className="user-icon-container">
            <div className="user-icon-circle">
              <span className="user-icon">👤</span>
            </div>
          </div>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

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