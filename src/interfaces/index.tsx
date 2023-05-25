export interface Image {
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
	price: number;
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
