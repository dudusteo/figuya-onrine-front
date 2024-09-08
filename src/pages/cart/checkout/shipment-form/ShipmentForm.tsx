import { Stack } from "@mui/material";
import { useEffect } from "react";
import CheckoutService from "../../../../services/checkoutService";

interface ShippingFormProps {
    orderToken: string;
}

const ShippingForm = ({ orderToken }: ShippingFormProps) => {

    useEffect(() => {
        CheckoutService.listShippingRates(orderToken).then((response) => {
            console.log(response);
        });
    }, [orderToken]);

    return (
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <div>Shipping Form</div>
        </Stack>
    );
};
export default ShippingForm;