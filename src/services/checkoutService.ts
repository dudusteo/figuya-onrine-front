import { IOrder, IOrderResult, ShippingRates, SpreeSDKError } from "@spree/storefront-api-v2-sdk";
import { bodyClient, queryClient } from "./client";

const CheckoutService = {

    async update(order_token: string): Promise<IOrder> {
        const response = bodyClient.checkout.orderUpdate({
            order_token: order_token,
            order: {
                email: "",

            },
        });

        return response.then((spreeResponse) => {
            if (spreeResponse.isSuccess())
                return spreeResponse.success();
            else {
                console.error(spreeResponse.fail());
                return spreeResponse.success();
            }
        });
    },

    async nextCheckoutStep(order_token: string): Promise<IOrderResult> {
        const response = await bodyClient.checkout.orderNext({
            order_token: order_token,
        });

        return response;
    },


    async listShippingRates(order_token: string): Promise<ShippingRates> {
        const response = queryClient.checkout.shippingRates({
            order_token: order_token,
        });

        return response.then((spreeResponse) => {
            return spreeResponse.success();
        });
    },


};

export default CheckoutService;
