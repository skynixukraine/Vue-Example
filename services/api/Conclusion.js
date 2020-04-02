import {HTTP} from "~/plugins/modules/axios";

export default {
    async validateHash(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post("/enquires/validate-hash", requestConfig)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 500){
                        message = "Internal technical error was happened.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async downloadConclusion(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.get(`/enquires/${requestConfig.id}/download-conclusion`, {params: requestConfig.requestData})
            .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 500){
                        message = "Internal technical error was happened.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
}