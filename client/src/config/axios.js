import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://habit-vault-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance; 