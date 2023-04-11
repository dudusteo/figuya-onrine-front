import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = async (email, password, firstName, lastName) => {
	return axios
		.post(API_URL + "/auth/signup", {
			email,
			password,
			firstName,
			lastName,
		})
		.then((response) => response.data);
};

const login = async (email, password) => {
	return axios
		.post(API_URL + "/auth/signin", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = async () => {
	localStorage.removeItem("user");
	return axios
		.post(API_URL + "/auth/signout")
		.then((response) => response.data);
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
