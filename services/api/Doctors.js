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
            HTTP.get("/doctors", {params : Object.assign(DEFAULT_REQUEST_PARAM, requestConfig || {})})
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
    async gMapDecodeAddressToCoords(requestConfig){
        requestConfig.key     = envConfig.GOOGLE_MAPS_API_KEY;
        requestConfig.address = requestConfig.address || "Berlin";

        return new Promise((resolve, reject) => {
            HTTP.get("https://maps.googleapis.com/maps/api/geocode/json", {params : requestConfig})
                .then(response => {
                    resolve(response.data.results[0].geometry.location);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    },
    async loadDoctorEnquires(requestData){
        return new Promise((resolve, reject) => {
            HTTP.get(`/doctors/${requestData.doctor_id}/enquires`, {
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
}