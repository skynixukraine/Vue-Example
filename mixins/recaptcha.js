import RecaptchaApi from '../services/api/Recaptcha'

export default {
    data() {
        return {
            recaptchaToken: '',
            isTokenVerify: false,
        }
    },
    methods: {
        async getRecaptchaToken() {
            await this.$recaptchaLoaded()
            const token = await this.$recaptcha(process.env.RECAPTCHA_ACTION)
            this.recaptchaToken = token
        },
        async getTokenVerify(token) {
            const isVerify = await RecaptchaApi.verifyToken(token)
            this.isTokenVerify = isVerify
            return isVerify
        }
    },
}