import envConfig from "~/configs/env.js";
import {HTTP} from "~/plugins/modules/axios";

export default {
    /**
     * Load Doctors
     * @return {Promise}
     */
    async loadDoctors(requestConfig){
        const DEFAULT_REQUEST_PARAM = {
            order_by  : "id",
            direction : "desc",
        };

        return new Promise((resolve, reject) => {
            HTTP.get("/enquires", {params : Object.assign(DEFAULT_REQUEST_PARAM, requestConfig || {})})
                .then(response => {
                    const responseData = {
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : 'Enquires success loaded.',
                    };

                    resolve(responseData);
                })
                .catch(error => {
                    let message = '';

                    if(error.response.status === 500){
                        message = "Internal technical error was happened.";
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

    async loadEnquire(requestData){
        return new Promise((resolve, reject) => {
            HTTP.get(`/enquires/${requestData.enquire_id}`, {
            params  : requestData.requestData,
            headers : {
                "Authorization" : `Bearer ${requestData.token}`,
                "Content-Type"  : "application/x-www-form-urlencoded"
            }
            }).then(response => {
                resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                });
            }).catch(error => {
                    reject({
                               success : false,
                               status  : error.response.status,
                               message : error.message,
                          });
            });
        });
    },
    async sendFindings(id, token, requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post(`/enquires/${id}/update-conclusion`,requestConfig,{
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            } ).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data,
                });
            }).catch(error => {
                reject({
                    success : false,
                    status  : error.response.status,
                    message : error.message,
                });
            });
        });
    },
}