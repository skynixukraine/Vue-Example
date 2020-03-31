import Stripe from "../services/api/Stripe";

export const state = () => ({
    source: null,
});

export const mutations = {
    SET_STRIPE_SOURCE(state, newValue){
        state.source = newValue;
    },
};

export const actions = {
    LOAD_AND_SAVE_STRIPE_SOURCE({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
                Stripe.loadStripeSource(requestConfig)
                      .then(response => {
                          commit("SET_STRIPE_SOURCE", response.result);
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      });
        });
    },
};