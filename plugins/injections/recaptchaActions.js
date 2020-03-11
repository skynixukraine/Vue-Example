import Vue from "vue"

export default ({app}, inject) => {
    const OPTIONS = {
        loginDoctor                 : "login_doctor",
        registerDoctor              : "register_doctor",
        sendEmailVerificationLink   : "send_email_verification_link",
        changeEmailVerificationLink : "change_email_verification_link",
    };

    Vue.prototype.$recaptchaActions = OPTIONS;
    app.recaptchaActions            = OPTIONS;
}