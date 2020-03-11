import {HTTP} from "~/plugins/modules/axios";

export default {
    async registerUser(registerData){
        return new Promise((resolve, reject) => {
            HTTP.post("/doctors/register", registerData)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "User success registered.",
                    });
                })
                .catch(error => {
                    let message = "";
                    let errors  = {};

                    if(error.response.status === 422){
                        message = "There are some validation errors.";
                        errors  = error.response.data.errors;
                    }
                    if(error.response.status === 500){
                        message = "Internal technical error was happened.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                        errors,
                    });
                });
        });
    },
    async loginUser(loginData){
        return new Promise((resolve, reject) => {
            HTTP.post("/doctors/login", loginData)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "User success login.",
                    });
                })
                .catch(error => {
                    let message = "";
                    let errors  = {};

                    if(error.response.status === 401){
                        message = "An authorization attempt has been failed.";
                    }
                    if(error.response.status === 422){
                        message = "There are some validation errors.";
                        errors  = error.response.data.errors;
                    }
                    if(error.response.status === 500){
                        message = "Internal technical error was happened.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                        errors,
                    });
                });
        });
    },
    async logoutUser(token){
        return new Promise((resolve, reject) => {
            HTTP.patch("/doctors/logout", {}, {headers : {"Authorization" : `Bearer ${token}`}})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "User success login.",
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 401){
                        message = "Authorization failed.";
                    }
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
    async loadUser({id, token}){
        return new Promise((resolve, reject) => {
            HTTP.get(`/doctors/${id}`, {headers : {"Authorization" : `Bearer ${token}`}})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "User success loaded",
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 401){
                        message = "Invalid signature: unauthenticated.";
                    }
                    if(error.response.status === 403){
                        message = "Current user has not permissions to do this action.";
                    }
                    if(error.response.status === 404){
                        message = "Resource not found.";
                    }
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
    async updateUser({id, token, params}){
        return new Promise((resolve, reject) => {
            HTTP.post(`/doctors/${id}`, params, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded",
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "User success updated",
                });
            }).catch(error => {
                let message = "";

                if(error.response.status === 401){
                    message = "Authorization failed.";
                }
                if(error.response.status === 403){
                    message = "Current user has not permissions to do this action.";
                }
                if(error.response.status === 422){
                    message = "Versuchen Sie, die Seite zu aktualisieren, und versuchen Sie es erneut.";
                }
                if(error.response.status === 404){
                    message = "Resource not found.";
                }
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
    async verifyUserEmail(verifyData){
        return new Promise((resolve, reject) => {
            HTTP.get("/doctors/verify-email", {params : verifyData})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        message : "Email is verify",
                    });
                })
                .catch(error => {
                    let message = "";

                    if(error.response.status === 304){
                        message = "An e-mail already verified.";
                    }
                    if(error.response.status === 401){
                        message = "Invalid signature: unauthenticated.";
                    }
                    if(error.response.status === 404){
                        message = "Resource not found."
                    }
                    if(error.response.status === 500){
                        message = "Etwas ist schief gelaufen, please try again later.";
                    }

                    reject({
                        success : false,
                        status  : error.response.status,
                        message,
                    });
                });
        });
    },
    async sendEmailVerifyLink(requestData){
        return new Promise((resolve, reject) => {
            HTTP.post("/doctors/send-email-verification-link", requestData)
                .then(response => {
                    console.log("sendEmailVerifyLink response: ", response);
                    resolve({
                        success : true,
                        status  : response.status,
                        message : "Verify link has been send on your email.",
                    });
                })
                .catch(error => {
                    console.log("sendEmailVerifyLink error: ", error);
                    let message = "";

                    if(error.response.status === 304){
                        message = "An e-mail already verified.";
                    }
                    if(error.response.status === 404){
                        message = "The doctor with provided email not found.";
                    }
                    if(error.response.status === 422){
                        message = "An email is not valid.";
                    }
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
    async loadPaymentData(requestConfig){
        return new Promise((resolve, reject) => {
            HTTP.get(`/doctors/${requestConfig.doctor_id}/stripe-connect`, {headers : {Authorization : `Bearer ${requestConfig.token}`}})
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data,
                        message : 'Doctors success loaded.',
                    });
                })
                .catch(error => {
                    let message = '';

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
    async connectPaymentStripe(requestData){
        return new Promise((resolve, reject) => {
            HTTP.patch(`/doctors/${requestData.doctor_id}/stripe-token`, requestData.requestData, {
                headers : {
                    "Authorization" : `Bearer ${requestData.token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "User success updated",
                });
            }).catch(error => {
                let message = "";

                if(error.response.status === 401){
                    message = "Authorization failed.";
                }
                if(error.response.status === 403){
                    message = "Current user has not permissions to do this action.";
                }
                if(error.response.status === 404){
                    message = "Resource not found.";
                }
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
    async requestActivation({id, token}){
        return new Promise((resolve, reject) => {
            HTTP.patch(`/doctors/${id}/request-activation`, {}, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "The request has been successfully sent for consideration by the administration",
                });
            }).catch(error => {
                let message = "";

                if(error.response.status === 401){
                    message = "Authorization failed.";
                }
                if(error.response.status === 403){
                    message = "Current user has not permissions to do this action.";
                }
                if(error.response.status === 404){
                    message = "Resource not found.";
                }
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
    async deleteUserAccount({id, token}){
        return new Promise((resolve, reject) => {
            HTTP.patch(`/doctors/${id}/close`, {}, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "Account successful delete",
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
    async pauseAccount({id, token}){
        return new Promise((resolve, reject) => {
            HTTP.patch(`/doctors/${id}/deactivate`, {}, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "Your account has been successfully suspended",
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
    async unPauseAccount({id, token}){
        return new Promise((resolve, reject) => {
            HTTP.patch(`/doctors/${id}/activate`, {}, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "Your account has been successfully restored",
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
    async sendChangeEmailLink({requestData, token}){
        return new Promise((resolve, reject) => {
            HTTP.post(`/doctors/send-change-email-request-link`, requestData, {
                headers : {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type"  : "application/x-www-form-urlencoded"
                }
            }).then(response => {
                console.log(response);
                resolve({
                    success : true,
                    status  : response.status,
                    data    : response.data.data,
                    message : "Eine Bestätigungs-E-Mail wurde an Ihre neue E-Mail gesendet",
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
    async verifyChangeEmail(requestData){
        return new Promise((resolve, reject) => {
            HTTP.post(`/doctors/change-email`, requestData)
                .then(response => {
                    resolve({
                        success : true,
                        status  : response.status,
                        data    : response.data.data,
                        message : "Success",
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