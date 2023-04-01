import axios from "axios";

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const API_URL = process.env.REACT_APP_API_URL;

const register = async (email, password, firstName, lastName) => {
  const response = await axios.post(API_URL + "/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(API_URL + "/auth/login", {
     email, password 
  });
  if (response.data.email) {
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
