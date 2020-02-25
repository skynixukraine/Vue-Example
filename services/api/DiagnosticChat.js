import {HTTP} from "~/plugins/modules/axios";

export default {
    async loadFirsQuestion(){

        return new Promise((resolve, reject) => {
            HTTP.get("/messages/first")
                .then(response => {
                    const responseData = {
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "First question success loaded.",
                    };

                    resolve(responseData);
                })
                .catch(error => {
                    let message = "";

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
    async loadNextQuestion(nextQuestionId){

        return new Promise((resolve, reject) => {
            HTTP.get(`/messages/${nextQuestionId}`)
                .then(response => {
                    const responseData = {
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Question success loaded.",
                    };

                    resolve(responseData);
                })
                .catch(error => {
                    let message = "";

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
    async loadTargetDoctorForDiagnosticChat(requestConfig){

        return new Promise((resolve, reject) => {
            HTTP.get("/doctors", {params : requestConfig})
                .then(response => {
                    const responseData = {
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : "Doctor success loaded.",
                    };

                    resolve(responseData);
                })
                .catch(error => {
                    let message = "";

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
    }
}