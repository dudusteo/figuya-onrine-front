import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = async (email: string, password: string, firstName: string, lastName: string) => {
	return axios
		.post(API_URL + "/auth/signup", {
			email,
			password,
			firstName,
			lastName,
		})
		.then((response) => response.data);
};

const login = async (email: string, password: string) => {
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
