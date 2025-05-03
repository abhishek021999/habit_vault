import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://habit-vault-backend.onrender.com/api/auth/login', {
        email,
        password
      });
      
      const { token } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('https://habit-vault-backend.onrender.com/api/auth/register', {
        name,
        email,
        password
      });
      
      const { token } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      return true;
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 
