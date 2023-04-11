import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getPublicContent = () => {
	return axios.get(API_URL + "/test/all");
};

const getUserBoard = () => {
	return axios.get(API_URL + "/test/user", { headers: authHeader() });
};

const getAdminBoard = () => {
	return axios.get(API_URL + "/test/admin", { headers: authHeader() });
};

const UserService = {
	getPublicContent,
	getUserBoard,
	getAdminBoard,
};

export default UserService;
