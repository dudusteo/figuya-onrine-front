import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
	AutocompleteRenderInputParams,
	createFilterOptions,
} from "@mui/material/Autocomplete";

interface OptionType {
	name: string;
	inputValue?: string;
}

const filter = createFilterOptions<OptionType>();

interface FreeSoloCreateOptionProps {
	id: string;
	options: OptionType[];
	renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const FreeSoloCreateOption = ({
	id,
	options,
	renderInput,
}: FreeSoloCreateOptionProps) => {
	const [value, setValue] = React.useState<OptionType | null>(null);

	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === "string") {
					setValue({
						name: newValue,
					});
				} else if (newValue && newValue.inputValue) {
					// Create a new value from the user input
					setValue({
						name: newValue.inputValue,
					});
				} else {
					setValue(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some(
					(option) => inputValue === option.name
				);
				if (inputValue !== "" && !isExisting) {
					filtered.push({
						inputValue,
						name: `Add "${inputValue}"`,
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			id={id}
			options={options}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.name;
			}}
			renderOption={(props, option) => <li {...props}>{option.name}</li>}
			sx={{ width: 300 }}
			freeSolo
			renderInput={renderInput}
		/>
	);
};

export default FreeSoloCreateOption;
