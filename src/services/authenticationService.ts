import {
	EmptyObjectResponse,
	EmptyObjectResult,
	IOAuthToken,
	IOAuthTokenResult,
} from "@spree/storefront-api-v2-sdk";
import { bodyClient } from "./client";

interface UserLogin {
	username: string;
	password: string;
}

const AuthenticationService = {
	async getToken(userLogin: UserLogin): Promise<IOAuthToken> {
		const response = bodyClient.authentication.getToken({
			...userLogin,
		});

		return response.then((spreeResponse: IOAuthTokenResult) => {
			return spreeResponse.success();
		});
	},

	async revokeToken(token: string): Promise<EmptyObjectResponse> {
		const response = bodyClient.authentication.revokeToken({
			token: token,
		});

		return response.then((spreeResponse: EmptyObjectResult) => {
			return spreeResponse.success();
		});
	},
};

export default AuthenticationService;
