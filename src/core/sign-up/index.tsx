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
import AuthService from "../../services/auth.service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		AuthService.register(data)
			.then((result) => {
				navigate("/account/login");
			})
			.catch((error) => console.log(error.response.data.message));
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
					{t("account.register.sign-up")}
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label={t("account.register.first-name")}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label={t("account.register.last-name")}
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								label={t("account.register.username")}
								name="username"
								autoComplete="username"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label={t("account.register.email")}
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label={t("account.register.password")}
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										value="allowExtraEmails"
										color="primary"
									/>
								}
								label={t("account.register.newsletter")}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{t("account.register.sign-up")}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/account/login" variant="body2">
								{t("account.register.have-account")}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
