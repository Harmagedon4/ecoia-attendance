import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplace par l'URL de ton backend
});
