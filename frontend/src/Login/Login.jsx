import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import backgroundGif from "../assets/images/memory-bg.gif";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
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
          <h2 className={`${styles.title}`}>Login</h2>
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
          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              className={`${styles.button} ${styles.loginButton}`}
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={handleRegisterRedirect} 
              className={`${styles.button} ${styles.registerButton}`}
            >
              Register
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
