import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        registerSuccess: 'register-success',
    }

    Vue.prototype.$modals = OPTIONS
    app.modals = OPTIONS
}