export default {
    data() {
        return {
            recaptchaToken: ''
        }
    },
    methods: {
        async loadAndSetRecaptchaToken(actionName) {
            const token = await this.getRecaptchaToken(actionName)
            this.setRecaptchaToken(token)
        },
        async getRecaptchaToken(actionName) {
            await this.$recaptchaLoaded()
            const token = await this.$recaptcha(actionName)
            return token
        },
        setRecaptchaToken(token) {
            this.recaptchaToken = token
        }
    },
}