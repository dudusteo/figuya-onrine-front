import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

interface UserResponse {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	error?: string;
}

const getCurrentUser = async () => {
	try {
		const response: AxiosResponse<UserResponse> = await axiosInstance.get(
			"/user/me"
		);

		// Store the token in localStorage
		const token = localStorage.getItem("token") as string;

		const { id, firstName, lastName, username, email } = response.data;
		const currentUser: User = {
			id,
			firstName,
			lastName,
			username,
			email,
			token,
		};
		return currentUser;
	} catch (error) {
		const axiosError = error as AxiosError<UserResponse>;
		throw new Error(axiosError.response?.data?.error || "Login failed");
	}
};

const UserService = {
	getCurrentUser,
};

export default UserService;
