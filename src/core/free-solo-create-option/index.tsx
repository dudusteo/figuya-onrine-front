import * as React from "react";
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
	value: string;
	setValue: (newValue: string) => void;
	id: string;
	options: OptionType[];
	renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const FreeSoloCreateOption = ({
	value,
	setValue,
	id,
	options,
	renderInput,
}: FreeSoloCreateOptionProps) => {
	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === "string") {
					setValue(newValue);
				} else if (newValue) {
					if (newValue.inputValue) {
						setValue(newValue.inputValue);
					} else {
						setValue(newValue.name);
					}
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
			sx={{ flexGrow: 1 }}
			freeSolo
			renderInput={renderInput}
		/>
	);
};

export default FreeSoloCreateOption;
