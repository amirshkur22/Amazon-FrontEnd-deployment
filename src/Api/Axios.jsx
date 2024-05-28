import axios from "axios";
const axoiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-8db4d/us-central1/api",
  baseURL: "https://amazon-backend-deployment.onrender.com",
  // baseURL: "http://localhost:2024",
});
export default axoiosInstance;
