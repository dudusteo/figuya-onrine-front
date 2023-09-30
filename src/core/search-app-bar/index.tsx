import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import MenuPopupState from "../menu-popup-state";
import { Avatar, Badge, Box, Button, IconButton, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import IconPopupState from "../icon-popup-state";
import figuya_logo from "../../assets/figuya_logo.svg";
import AuthenticationService from "../../services/authenticationService";
import { useDispatch } from "react-redux";
import { clearBearerToken } from "../../features/token/bearerTokenSlice";

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

const SmallAvatar = styled(Avatar)(({ theme }) => ({
	width: 22,
	height: 22,
	border: `1px solid ${theme.palette.background.paper}`,
}));

const SearchAppBar = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

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
							placeholder={t("nav-bar.search") as string}
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<IconPopupState
						href="/account"
						items={[
							{
								name: t("nav-bar.menu1.account"),
								href: "/account",
							},
							{
								name: t("nav-bar.menu1.sign-in"),
								href: "/account/login",
							},
							{
								name: t("nav-bar.menu1.sign-up"),
								href: "/account/register",
							},
							{
								name: t("nav-bar.menu1.sign-out"),
								href: "/",
								onClick: () => {
									dispatch(clearBearerToken());
									AuthenticationService.revokeToken("");
								},
							},
						]}
						sx={{ ml: 1 }}
					>
						<AccountCircleIcon fontSize="large" />
					</IconPopupState>
					<IconButton href="/cart">
						<Badge
							overlap="circular"
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							badgeContent={<SmallAvatar>{3}</SmallAvatar>}
						>
							<ShoppingCartIcon fontSize="large" />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
				<Toolbar variant="dense">
					<Box sx={{ flexGrow: 1 }}>
						<MenuPopupState
							href="/shop"
							text={t("nav-bar.bar1")}
							items={[{ name: "" }]}
						/>
						<MenuPopupState
							text={t("nav-bar.bar2")}
							items={[{ name: "" }]}
						/>
						<MenuPopupState
							text={t("nav-bar.bar3")}
							items={[{ name: "" }]}
						/>
						<MenuPopupState
							text={t("nav-bar.bar4")}
							items={[{ name: "" }]}
						/>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default SearchAppBar;
