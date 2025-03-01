import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    username: '', // Use 'username' for both username and email
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
        body: JSON.stringify({
          username: formData.username, // Send username/email
          password: formData.password,
        }),
      });

      // Handle non-JSON responses (e.g., HTML error pages)
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error('Non-JSON response:', responseText);
        const errorMessage = responseText.match(/<p>(.*?)<\/p>/)?.[1] || 'Server error: Invalid response format';
        throw new Error(errorMessage);
      }

      // Log the response data for debugging
      console.log('Response data:', data);

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Ensure the response contains the expected fields
      if (!data.user || !data.user.role || !data.token) {
        throw new Error('Invalid response from server');
      }

      const { user, token } = data;
      login(user, token); // Pass both user and token to the login function

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

  return (
    <div className="auth-page">
      <div className="right-side">
        <button className="back-button" onClick={() => navigate('/')} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <div className="auth-form">
          <div className="user-icon-container">
            <div className="user-icon-circle">
              <span className="user-icon">👤</span>
            </div>
          </div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username or Email</label>
              <input
                type="text"
                placeholder="Username or Email"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <p className="forgot-password-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="auth-link">
            Don't have an account?{' '}
            <span
              className="signup-link"
              onClick={() => setShowRoleModal(true)}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {showRoleModal && (
        <div className="role-modal">
          <div className="modal-content">
            <p>Choose your role:</p>
            <button className="button" onClick={() => handleRoleSelection('user')}>
              User
            </button>
            <button className="button-outline" onClick={() => handleRoleSelection('admin')}>
              Admin
            </button>
            <button className="back-button" onClick={() => setShowRoleModal(false)}>
              <FaArrowLeft />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;