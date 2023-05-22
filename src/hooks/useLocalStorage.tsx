import * as React from "react";

export const useLocalStorage = <T,>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = React.useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setState = (state: React.SetStateAction<T>) => {
		try {
			const valueToStore =
				state instanceof Function ? state(storedValue) : state;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setState];
};
