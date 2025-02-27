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


   t
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