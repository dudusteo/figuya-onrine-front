import {
    ITaxons,
    ITaxonsResult,
} from "@spree/storefront-api-v2-sdk";
import { queryClient } from "./client";

const TaxonService = {
    async getTaxons(): Promise<ITaxons> {
        const response = queryClient.taxons.list({ per_page: 100 });

        const taxons = response.then((spreeResponse: ITaxonsResult) => {
            return spreeResponse
                .success()
        });

        return taxons;
    },
}

export default TaxonService;