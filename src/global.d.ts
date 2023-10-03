interface Image extends File {
	id: number;
	path: string;
	createdAt: Date;
	updatedAt: Date;
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

interface ImportMeta {
	env: {
		VITE_API_URL?: string;
	};
}
