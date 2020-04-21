import envConfig from "~/configs/env.js";
import {HTTP} from "~/plugins/modules/axios";

export default {
    /**
     * Load Pricing
     * @return {Promise}
     */

    async loadPricing(requestConfig){
        const DEFAULT_REQUEST_PARAM = {
            order_by  : "id",
            direction : "desc",
        };

        return new Promise((resolve, reject) => {
            HTTP.get("/pricing-policies", {params : Object.assign(DEFAULT_REQUEST_PARAM, requestConfig || {})})
                .then(response => {
                    const responseData = {
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : 'Doctors success loaded.',
                    };

                    resolve(responseData);
                })
                .catch(error => {
                    let message = '';

                    if(error.response.status === 500){
                        message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                    }

                    const responseData = {
                        success : false,
                        status  : error.response.status,
                        message,
                    };

                    reject(responseData);
                });
        });
    },
}