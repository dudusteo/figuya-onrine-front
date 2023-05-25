import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
	baseURL: API_URL,
});

// Add an interceptor to include the token in the request headers
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("token");

	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}

	return config;
});

// Handle response errors or token expiration
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			// Token expired or invalid, handle accordingly
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
