import type { RawAxiosRequestHeaders } from "axios";

export default function authHeader(): RawAxiosRequestHeaders {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;

	if (user && user.accessToken) {
		// for Node.js Express back-end
		return { "x-access-token": user.accessToken };
	} else {
		return {};
	}
}
