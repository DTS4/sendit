import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ForgotPassword() {
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
    if (!email) {
      setError('Email is required.');
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

    try {
      // Log the request payload for debugging
      console.log('Request payload:', { email });

      const response = await fetch('https://sendit-backend-j83j.onrender.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        // Handle non-JSON responses (e.g., HTML error pages)
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);

        // Attempt to extract an error message from the HTML response
        const errorMessage = responseText.match(/<p>(.*?)<\/p>/)?.[1] || 'Server error: Invalid response format';
        throw new Error(errorMessage);
      }

      // Parse the response as JSON
      const data = await response.json();
      console.log('Response data:', data);

      // Set success message
      setMessage(data.message || 'Password reset link sent to your email.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="right-side">
        <button
          className="back-button"
          onClick={() => navigate('/login')}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <div className="auth-form">
          <div className="user-icon-container">
            <div className="user-icon-circle">
              <span className="user-icon">🔒</span>
            </div>
          </div>
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="auth-link">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;