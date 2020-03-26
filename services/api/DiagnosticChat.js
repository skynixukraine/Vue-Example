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
                        message : "First question success loaded.",
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
    async loadNextQuestion(nextQuestionId){
        return new Promise((resolve, reject) => {
            HTTP.get(`/messages/${nextQuestionId}`)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Question success loaded.",
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
    async loadTargetDoctorForDiagnosticChat(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.get("/doctors", {params : requestConfig})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Doctor success loaded.",
                    });
                })
                .catch(error => {
                    let message = error.message;

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
    async createEnquires(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post("/enquires", requestConfig)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Enquires success created.",
                    });
                })
                .catch(error => {
                    console.log(error);
                    let message = error.message;

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
    async sendSmsCode(id){
        return new Promise((resolve, reject) => {
            HTTP.get(`/enquires/${id}/send-sms`, {})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "SMS has been send",
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
    async verifySmsCode(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.post(`/enquires/${requestConfig.id}/verify-sms`, requestConfig)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "SMS has been send",
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