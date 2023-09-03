import { IAccount, IAccountResult } from "@spree/storefront-api-v2-sdk";
import client from "./client";

interface User {
	email: string;
	password: string;
	password_confirmation: string;
	first_name?: string;
	last_name?: string;
	public_metadata?: {
		[key: string]: string;
	};
	private_metadata?: {
		[key: string]: string;
	};
}

const AccountService = {
	async createAccount(user: User): Promise<IAccount> {
		return client.account
			.create({
				user: user,
			})
			.then((spreeResponse: IAccountResult) => {
				return spreeResponse.success();
			});
	},

	async accountInfo(bearer_token: string): Promise<IAccount> {
		return client.account
			.accountInfo({
				bearer_token: bearer_token,
			})
			.then((spreeResponse: IAccountResult) => {
				return spreeResponse.success();
			});
	},
};

export default AccountService;
