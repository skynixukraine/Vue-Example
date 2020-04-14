import {HTTP} from "~/plugins/modules/axios";

export default {
    async loadFirsQuestion(){
        return new Promise((resolve, reject) => {
            HTTP.get("/messages/first")
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "First question loaded successfully.",
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 500){
                        message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async loadNextQuestion(nextQuestionId){
        return new Promise((resolve, reject) => {
            HTTP.get(`/messages/${nextQuestionId}`)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Question loaded successfully.",
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 500){
                        message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async loadTargetDoctorForDiagnosticChat(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.get("/doctors", {params : requestConfig})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Doctor loaded successfully.",
                    });
                })
                .catch(error => {
                    let message = error.message;

                    if(error.response.status === 500){
                        message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async createEnquires(data){
        return new Promise((resolve, reject) => {
            HTTP.post("/enquires", data)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Enquiry was created successfully.",
                    });
                })
                .catch(error => {
                    let message = error.message;

                    if(error.response.status === 500){
                        message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async sendSmsCode(id){
        return new Promise((resolve, reject) => {
            HTTP.get(`/enquires/${id}/send-sms`, {})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "SMS has been sent.",
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
    async verifySmsCode(id, requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post(`/enquires/${id}/verify-sms`, requestConfig)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Phone has been verified successfully",
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
    async chargeEnquire(id, requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post(`/enquires/${id}/charge`, requestConfig)
            .then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data,
                    message : "New enquiry was created successfully.",
                });
            }).catch(error => {
                let message = error.message;

                if(error.response.status === 500){
                    message = "Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.";
                }
                reject({
                    success : false,
                    status  : error.response.status,
                    message,
                });
            });
        });
    },
    async getPaymentMethods(id){
        return new Promise((resolve, reject) => {
            HTTP.get(`/enquires/payment-methods`, {})
            .then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
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
