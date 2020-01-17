const DEFAULT_RECAPTCHA_TOKEN = ''

export default {
    data() {
        return {
            recaptchaToken: DEFAULT_RECAPTCHA_TOKEN
        }
    },

    methods: {
        async loadAndSetRecaptchaToken(action) {
            const token = await this.$recaptcha(action)
            this.recaptchaToken = token
        },
    }
}