import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = async (formData: FormData) => {
	return axios
		.post(API_URL + "/auth/register", formData)
		.then((response) => response.data);
};

const login = async (formData: FormData) => {
	return axios.post(API_URL + "/auth/login", formData).then((response) => {
		if (response.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	});
};

const logout = async () => {
	localStorage.removeItem("user");
	// return axios
	// 	.post(API_URL + "/auth/signout")
	// 	.then((response) => response.data);
};

const getCurrentUser = () => {
	const userString = localStorage.getItem("user");
	return userString ? JSON.parse(userString) : null;
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
