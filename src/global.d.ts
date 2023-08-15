interface Image extends File {
	id: number;
	path: string;
	createdAt: Date;
	updatedAt: Date;
}

interface Figurine {
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

interface Options {
	character: Option[];
	origin: Option[];
	company: Option[];
	type: Option[];
}

interface Option {
	id: number;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface User {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	token: string;
}

interface ImportMeta {
	env: {
		VITE_API_URL?: string;
		VITE_STATIC_URL?: string;
	};
}
