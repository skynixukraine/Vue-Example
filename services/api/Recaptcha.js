import Vue from 'vue'

export default {
    /**
     * Returns reCaptcha Token by Action name
     * @param {string} actionName
     * @return {Promise} token
     */
    async loadRecaptchaToken(actionName) {
        await Vue.prototype.$recaptchaLoaded()
        const token = await Vue.prototype.$recaptcha(actionName)

        return token
    },
}