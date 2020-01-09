import Vue from 'vue'

export default {

    async loadRecaptchaToken(actionName) {
        await Vue.prototype.$recaptchaLoaded()
        const token = await Vue.prototype.$recaptcha(actionName)

        return token
    },
}