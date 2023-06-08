export interface Image extends File {
	id: number;
	path: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Figurine {
	id: number;
	name: string;
	character: string;
	origin: string;
	company: string;
	type: string;
	condition: string;
	price: string;
	images: Image[];
}

export interface Options {
	character: Option[];
	origin: Option[];
	company: Option[];
	type: Option[];
}

export interface Option {
	id: number;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	token: string;
}
