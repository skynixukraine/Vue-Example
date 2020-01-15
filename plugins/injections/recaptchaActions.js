import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        registerDoctor: 'register_doctor',
        loginDoctor: 'login_doctor',
        sendEmailVerificationLink: 'send_email_verification_link'
    }
    
    Vue.prototype.$recaptchaActions = OPTIONS
    app.recaptchaActions = OPTIONS
}