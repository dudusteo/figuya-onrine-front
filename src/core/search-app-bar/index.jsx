import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import MenuPopupState from "../menu-popup-state";
import { Box, Button, Link } from "@mui/material";
import Image from "mui-image";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const SearchAppBar = () => {
	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{ height: "120px" }}>
					<Link href="/">
						<Image
							width="50px"
							src="https://picsum.photos/id/674/2000"
						></Image>
					</Link>
				</Toolbar>
			</AppBar>
			<AppBar position="static" color="primary" sx={{ opacity: "50%" }}>
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<MenuPopupState
							text="Szukaj wg serii"
							items={["Vocaloid", "Demon Slayer", "Love Live"]}
						/>
						<MenuPopupState
							text="Szukaj wg firmy"
							items={["Furyu", "Sega", "Alter", "Freeing"]}
						/>
						<MenuPopupState text="Przeceny" items={[""]} />
						<Button href="/cart" variant="h6">
							Koszyk
						</Button>
					</Box>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default SearchAppBar;
