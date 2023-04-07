import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import MenuPopupState from "../menu-popup-state";
import { Box, Button, Link } from "@mui/material";
import figuya_logo from "../../assets/figuya_logo.svg";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();

	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{ mt: 1, mb: 0 }}>
					<Box sx={{ flexGrow: 1 }}>
						<Link href="/">
							<img
								color="white"
								height="80px"
								alt=""
								src={figuya_logo}
							></img>
						</Link>
					</Box>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder={t("nav-bar.search")}
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Toolbar>
			</AppBar>
			<AppBar position="static" color="primary" sx={{ opacity: "50%" }}>
				<Toolbar variant="dense">
					<Box sx={{ flexGrow: 1 }}>
						<MenuPopupState
							href="/shop"
							text={t("nav-bar.bar1")}
							items={[
								{ name: "Vocaloid" },
								{ name: "Demon Slayer" },
								{ name: "Love Live" },
							]}
						/>
						<MenuPopupState
							text={t("nav-bar.bar2")}
							items={[
								{ name: "Furyu" },
								{ name: "Sega" },
								{ name: "Alter" },
								{ name: "Freeing" },
							]}
						/>
						<MenuPopupState text={t("nav-bar.bar3")} items={[""]} />
						<MenuPopupState text={t("nav-bar.bar4")} items={[""]} />
						<Button href="/cart" variant="h6">
							Koszyk
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default SearchAppBar;
