import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function FreeSoloCreateOption(props) {
	const [value, setValue] = React.useState(null);

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
					console.log("new value: here update database");
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
			id="free-solo-with-text"
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
			renderInput={(params) => (
				<TextField {...params} label="Free solo with text demo" />
			)}
			{...props}
		/>
	);
}
