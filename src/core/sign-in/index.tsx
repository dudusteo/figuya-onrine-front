import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/authenticationService";
import { IOAuthToken } from "@spree/storefront-api-v2-sdk";
import { useAppDispatch } from "../../app/hooks";
import { setBearerToken } from "../../features/token/bearerTokenSlice";

export default function SignIn() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		AuthenticationService.getToken({
			username: data.get("login") as string,
			password: data.get("password") as string,
		})
			.then((token: IOAuthToken) => {
				dispatch(setBearerToken(token.access_token));
				navigate("/account");
			})
			.catch((error: Error) =>
				console.error("Login failed:", error.message)
			);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{t("account.login.sign-in")}
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="login"
						label={t("account.login.login")}
						name="login"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label={t("account.login.password")}
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label={t("account.login.remember")}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{t("account.login.sign-in")}
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								{t("account.login.forgot")}
							</Link>
						</Grid>
						<Grid item>
							<Link href="/account/register" variant="body2">
								{t("account.login.no-account")}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
