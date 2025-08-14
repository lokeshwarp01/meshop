import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Load users from localStorage or initialize empty array
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Save current user session
  const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (action === "Sign Up") {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (action === "Sign Up" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find(u => u.email === formData.email);
    
    if (!user) {
      toast.error('Email not found. Please sign up.');
      return false;
    }
    
    if (user.password !== formData.password) {
      toast.error('Incorrect password');
      return false;
    }
    
    setCurrentUser(user);
    toast.success('Logged in successfully!');
    navigate('/');
    return true;
  };

  const handleSignup = () => {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === formData.email)) {
      toast.error('Email already registered. Please login.');
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };
    
    // Save new user
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    toast.success('Account created successfully!');
    navigate('/');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (action === "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-box">
        <div className="login-signup-header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {action === "Sign Up" && (
            <div className="input-group">
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            </div>
          )}
          
          <div className="input-group">
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          </div>
          
          {action === "Sign Up" && (
            <div className="input-group">
              <div className="input-field">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
          )}
          
          {action === "Login" && (
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          )}
          
          <div className="submit-container">
            <button type="submit" className="submit-btn">
              {action === "Login" ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="toggle-action">
          {action === "Login" ? (
            <span>
              Don't have an account?{' '}
              <span className="toggle-link" onClick={() => setAction("Sign Up")}>
                Sign Up
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <span className="toggle-link" onClick={() => setAction("Login")}>
                Login
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;