import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        registerDoctor: 'register_doctor',
        loginDoctor: 'login_doctor'
    }
    
    Vue.prototype.$recaptchaActions = OPTIONS
    app.recaptchaActions = OPTIONS
}