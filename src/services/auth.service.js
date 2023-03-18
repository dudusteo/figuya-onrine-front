import axios from "axios";

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const API_URL = process.env.REACT_APP_API_URL;

const register = async (username, email, password) => {
  const response = await axios.post(API_URL + "/auth/signup", {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "/auth/signin", {
     username, password 
  });
  if (response.data.username) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "signout");
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
