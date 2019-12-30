export default {
    data() {
        return {
            recaptchaToken: '',
            isTokenVerify: false,
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