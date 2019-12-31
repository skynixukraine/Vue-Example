export default {
    data() {
        return {
            recaptchaToken: ''
        }
    },
    methods: {
        async getRecaptchaToken(actionName) {
            await this.$recaptchaLoaded()
            const token = await this.$recaptcha(actionName)
            return token
        },
    },
}