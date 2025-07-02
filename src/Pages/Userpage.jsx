import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/user';

const Userpage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    emailid: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { username, emailid, password } = form;

    // Simple validation
    if (!username || !emailid || !password) {
      alert('⚠️ Please fill all the fields.');
      return;
    }

    if (password.length < 8) {
      alert('⚠️ Password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await axios.post(API_BASE, form);

      // Save userId to localStorage
      const userId = res.data.id;
      localStorage.setItem('userId', userId);

      alert('🎉 Account created and logged in!');
      setForm({ username: '', emailid: '', password: '' });

      // Redirect to home/product/cart etc.
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('❌ Error registering user. Email may already be in use.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '40px' }}>
      <Navbar />
      <h2 className="text-center mb-4">🚀 Create Your Account</h2>

      <div className="container d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}>
          {/* Username */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingname"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <label htmlFor="floatingname">👤 Enter Your Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="emailid"
              value={form.emailid}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">📧 Enter Email Address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="floatingPassword"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">🔒 Enter Password</label>
            <small
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                right: '15px',
                transform: 'translateY(-50%)'
              }}
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </small>
            <div className="form-text mt-1">
              Password must be at least 8 characters.
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 mt-2"
            onClick={handleSubmit}
            style={{ borderRadius: '8px' }}
          >
            ✅ Register
          </button>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">🔐 Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Userpage;
