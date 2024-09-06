import * as React from "react";

import { Box, Button, Card, CardContent, Grid, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";

import CartService from "../../services/cartService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IOrder } from "@spree/storefront-api-v2-sdk/dist/*";
import {
	getOrderToken,
	setOrderToken,
} from "../../features/token/orderTokenSlice";
import { getCart, updateOrder } from "../../features/basket/basketSlice";
import { useTranslation } from "react-i18next";
import AddressForm from "./address-form/AddressForm";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Info from "./info";
import PaymentForm from "./payment-form/PaymentForm";
import ShipmentForm from "./shipment-form/ShipmentForm";
import CheckoutService from "../../services/checkoutService";

function getStepContent(step: number, orderToken: string) {
	switch (step) {
		case 0:
			return <AddressForm orderToken={orderToken} />;
		case 1:
			return <ShipmentForm orderToken={orderToken} />;
		case 2:
			return <PaymentForm />;
		// case 3:
		// 	return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

const steps = ['address', 'delivery', 'payment', 'review-your-order'];

const Checkout = () => {
	const { t } = useTranslation();
	const [activeStep, setActiveStep] = React.useState(0);
	const orderToken = useAppSelector(getOrderToken);
	const cart = useAppSelector(getCart)
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (!orderToken) {
			CartService.create().then((token: IOrder) => {
				dispatch(setOrderToken(token.data.attributes.token));
			});
		}

		if (orderToken) {
			CartService.show(orderToken).then((cart: IOrder) => {
				dispatch(updateOrder(cart));
			});
		}
	}, [orderToken, dispatch]);

	if (!cart || !orderToken) {
		return <div>Loading...</div>;
	}

	const handleNext = () => {
		CheckoutService.nextCheckoutStep(orderToken).then((order) => {
			console.log(order);
			if (order.isSuccess()) {
				dispatch(updateOrder(order.success()));
				setActiveStep(activeStep + 1);
			}
			else
				console.error(order.fail());
		});

	};
	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
			<Grid item
				sm={12}
				md={7}
				lg={8}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '100%',
					width: '100%',
					backgroundColor: { xs: 'transparent', sm: 'background.default' },
					alignItems: 'start',
					pt: { xs: 6, sm: 16 },
					px: { xs: 2, sm: 10 },
					gap: { xs: 4, md: 8 },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: { sm: 'space-between', md: 'flex-end' },
						alignItems: 'center',
						width: '100%',
						maxWidth: { sm: '100%', md: 600 },
					}}
				>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							flexGrow: 1,
						}}
					>
						<Stepper
							id="desktop-stepper"
							activeStep={activeStep}
							sx={{ width: '100%', height: 40 }}
						>
							{steps.map((label) => (
								<Step
									sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
									key={label}
								>
									<StepLabel>{t(`cart.${label}`)}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
				</Box>
				<Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
					<CardContent
						sx={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<Typography variant="subtitle2" gutterBottom>
								{t("cart.selected-products")}
							</Typography>
							<Typography variant="body1">
								{cart.data.attributes.display_item_total}
							</Typography>
						</div>
						{/* <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} /> */}
					</CardContent>
				</Card>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						width: '100%',
						maxWidth: { sm: '100%', md: 600 },
						maxHeight: '720px',
						gap: { xs: 5, md: 'none' },
					}}
				>
					<Stepper
						id="mobile-stepper"
						activeStep={activeStep}
						alternativeLabel
						sx={{ display: { sm: 'flex', md: 'none' } }}
					>
						{steps.map((label) => (
							<Step
								sx={{
									':first-child': { pl: 0 },
									':last-child': { pr: 0 },
									'& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
								}}
								key={label}
							>
								<StepLabel
									sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
								>
									{label}
								</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Stack spacing={2} useFlexGap>
							<Typography variant="h1">📦</Typography>
							<Typography variant="h5">Thank you for your order!</Typography>
							<Typography variant="body1" sx={{ color: 'text.secondary' }}>
								Your order number is
								<strong>&nbsp;#140396</strong>. We have emailed your order
								confirmation and will update you once its shipped.
							</Typography>
							<Button
								variant="contained"
								sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
							>
								Go to my orders
							</Button>
						</Stack>
					) : (
						<React.Fragment>
							{getStepContent(activeStep, orderToken)}
							<Box
								sx={[
									{
										display: 'flex',
										flexDirection: { xs: 'column-reverse', sm: 'row' },
										alignItems: 'end',
										flexGrow: 1,
										gap: 1,
										pb: { xs: 12, sm: 0 },
										mt: { xs: 2, sm: 0 },
										mb: '60px',
									},
									activeStep !== 0
										? { justifyContent: 'space-between' }
										: { justifyContent: 'flex-end' },
								]}
							>
								{activeStep !== 0 && (
									<Button
										startIcon={<ChevronLeftRoundedIcon />}
										onClick={handleBack}
										variant="text"
										sx={{ display: { xs: 'none', sm: 'flex' } }}
									>
										{t('cart.back')}
									</Button>
								)}
								{activeStep !== 0 && (
									<Button
										startIcon={<ChevronLeftRoundedIcon />}
										onClick={handleBack}
										variant="outlined"
										fullWidth
										sx={{ display: { xs: 'flex', sm: 'none' } }}
									>
										{t('cart.back')}
									</Button>
								)}
								<Button
									variant="contained"
									endIcon={<ChevronRightRoundedIcon />}
									onClick={handleNext}
									sx={{ width: { xs: '100%', sm: 'fit-content' } }}
								>
									{activeStep === steps.length - 1 ? t("cart.place-order") : t('cart.next')}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Box>
			</Grid>
			<Grid item
				xs={12}
				sm={5}
				lg={4}
				sx={{
					display: { xs: 'none', md: 'flex' },
					flexDirection: 'column',
					backgroundColor: 'background.paper',
					borderLeft: { sm: 'none', md: '1px solid' },
					borderColor: { sm: 'none', md: 'divider' },
					alignItems: 'start',
					pt: 16,
					px: 10,
					gap: 4,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						width: '100%',
						maxWidth: 500,
					}}
				>
					<Info cart={cart} />
				</Box>
			</Grid>
		</Grid>
	);
};

export default Checkout;
