import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import backgroundGif from "../assets/images/memory-bg.gif";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message);
      // Clear form after successful registration
      setFormData({ username: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className={styles.backgroundContainer}
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Memory Game</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className={`${styles.title}`}>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={styles.input}
            required
          />
          <button 
            type="submit" 
            className={`${styles.button}`}
          >
            Register
          </button>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.backButtonContainer}>
            <span 
              onClick={handleBackToLogin} 
              className={styles.backButton}
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
