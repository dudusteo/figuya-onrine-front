import { Options } from "../interfaces";

const getOptions = async (): Promise<Options> => {
	return new Promise((resolve, reject) => {
		resolve({
			character: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			origin: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			company: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
			type: [
				{
					id: 1,
					name: "Hatsune Miku",
				},
			],
		});
	});
};

const OptionService = {
	getOptions,
};

export default OptionService;
