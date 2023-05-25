import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "../services/axiosInstance";

interface AuthResponse {
	token: string;
	error?: string;
}

interface LoginRequest {
	login: string;
	password: string;
}

interface RegisterRequest {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

const register = async (credentials: RegisterRequest) => {
	try {
		const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
			"/auth/register",
			credentials
		);
		const token: string = response.data.token;

		// Store the token in localStorage
		localStorage.setItem("token", token);

		return token;
	} catch (error) {
		const axiosError = error as AxiosError<AuthResponse>;
		throw new Error(axiosError.response?.data?.error || "Login failed");
	}
};

const login = async (credentials: LoginRequest) => {
	try {
		const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
			"/auth/login",
			credentials
		);
		const token: string = response.data.token;

		// Store the token in localStorage
		localStorage.setItem("token", token);

		return token;
	} catch (error) {
		const axiosError = error as AxiosError<AuthResponse>;
		throw new Error(axiosError.response?.data?.error || "Login failed");
	}
};

const logout = () => {
	// Remove the token from localStorage
	localStorage.removeItem("token");
};

const AuthService = {
	register,
	login,
	logout,
};

export default AuthService;
