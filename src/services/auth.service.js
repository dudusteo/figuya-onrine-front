import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const signUp = async (email, password, firstName, lastName) => {
	const response = await axios.post(API_URL + "/auth/signup", {
		email,
		password,
		firstName,
		lastName,
	});
	return response.data;
};

const signIn = async (email, password) => {
	const response = await axios.post(API_URL + "/auth/signin", {
		email,
		password,
	});
	if (response.data.email) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const signOut = async () => {
	localStorage.removeItem("user");
	const response = await axios.post(API_URL + "/auth/signout");
	return response.data;
};

const getContent = async () => {
	const user = getCurrentUser();
	const response = await axios.get(API_URL + "/test/user", {
		headers: {
			"x-access-token": user.accessToken,
		},
	});
	return response.data;
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
	getContent,
	signUp,
	signIn,
	signOut,
	getCurrentUser,
};

export default AuthService;
