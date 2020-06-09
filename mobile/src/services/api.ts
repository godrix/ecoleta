import axios from  'axios';
import app from '../constants/app';

const api = axios.create({
  baseURL : app.baseApi
});

export default api;