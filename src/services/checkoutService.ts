import { IOrderResult, IShipment, ShippingRates } from "@spree/storefront-api-v2-sdk";
import { bodyClient, queryClient } from "./client";

export interface OrderUpdateOptions {
    email?: string;
    bill_address_attributes?: {
        firstname: string;
        lastname: string;
        address1: string;
        address2?: string;
        city: string;
        zipcode: string;
        state_name: string;
        country_iso: string;
        phone: string;
    };
    ship_address_attributes?: {
        firstname: string;
        lastname: string;
        address1: string;
        address2?: string;
        city: string;
        zipcode: string;
        state_name: string;
        country_iso: string;
        phone: string;
    };
    shipments_attributes?: IShipment[]
}

const CheckoutService = {
    async update(order_token: string, order: OrderUpdateOptions): Promise<IOrderResult> {
        const response = bodyClient.checkout.orderUpdate({
            order_token: order_token,
            order: order,
        });

        return response;
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