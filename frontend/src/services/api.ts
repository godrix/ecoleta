import axios from "axios";
import app from "../constants/app";

const api = axios.create({
  baseURL: app.app_api,
});

export default api;
