import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://sendit-backend-j83j.onrender.com/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: password,
          confirm_password: confirmPassword,
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
        throw new Error(data.error || 'Failed to reset password');
      }

      // Set success message
      setMessage(data.message || 'Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error('Reset password error:', error);
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
              <span className="user-icon">🔑</span>
            </div>
          </div>
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;