import {HTTP} from "~/plugins/modules/axios";

export default {
    async loadStripeSource(data){
        let stripe = Stripe(process.env.STRIPE_KEY);
        let response = stripe.createSource(data);
        return response;
    },
}