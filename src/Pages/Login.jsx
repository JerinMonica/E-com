import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedEmail = emailid.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert('⚠️ Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/login', {
        emailid: trimmedEmail,
        password: trimmedPassword,
      });

      if (res.data && res.data.userid && res.data.name) {
        // ✅ Store full user session
        const user = {
          userid: res.data.userid,
          name: res.data.name,
          email: trimmedEmail
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');

        alert('✅ Login successful!');
        setEmailid('');
        setPassword('');
        navigate('/'); // ✅ Redirect to home page
      } else {
        alert('❌ Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response && err.response.status === 401) {
        alert('❌ Invalid email or password');
      } else {
        alert('❌ Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '60px' }}>
      <Navbar />
      <h2 className="text-center mb-4">🔐 Login to Your Account</h2>

      <div className="container d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px', borderRadius: '12px' }}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Email"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">📧 Email address</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">🔒 Password</label>
            <small
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                right: '15px',
                transform: 'translateY(-50%)',
              }}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </small>
          </div>

          <button
            className="btn btn-success w-100 mt-2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '🔄 Logging in...' : '🔓 Login'}
          </button>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/userpage">📝 Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
